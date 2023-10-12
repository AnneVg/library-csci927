import { Injectable, Logger, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBorrowInput } from './create-borrow.input.model';
import { UpdateBorrowInput } from './update-borrow.input.model';

@Injectable()
export class BorrowService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAllBorrows() {
    const borrows = await this.prisma.borrowingBook.findMany({
      include: {
        book: true,
        member: true,
      }
    });
    return borrows;
  }

  async getBorrowById(id: string) {
    const borrow = this.prisma.borrowingBook.findUnique({
      include: {
        book: true,
        member: true
      },
      where: {
        id: id,
      },
    });
    return borrow;
  }

  async addBorrow(createBorrowInput: CreateBorrowInput) {
    const student = await this.prisma.member.findFirst({
      where: {
        studentId: createBorrowInput.studentId
      }
    });
    if (!student) throw Error('Invalid student');

    const book = await this.prisma.book.findFirst({
      where: {
        isbn: createBorrowInput.isbn
      }
    });
    if (!book) throw Error('Invalid book');

    const dataToInsert = {
      data: {
        dueDate: new Date(),
        status: 'onloan',
        bookId: book.id,
        memberId: student.id
      },
    };
    const borrow = await this.prisma.borrowingBook.create(dataToInsert);
    return borrow;
  }

  async updateBorrow(borrowId: string, updateBorrowInput: UpdateBorrowInput) {
    const borrow = await this.prisma.borrowingBook.findUnique({
      where: {
        id: borrowId
      }
    });

    if (!borrow) throw Error('Invalid borrow');
  
    const updatedBorrow = await this.prisma.borrowingBook.update({
      where: {
        id: borrow.id
      },
      data: {
        ...updateBorrowInput,
        updatedAt: new Date()
      }
    });
  
    return updatedBorrow;
  }

  async deleteBorrow(borrowId: string) {
    return await this.prisma.borrowingBook.deleteMany({
      where: {
        id: borrowId
      }
    });
  
  }
}
