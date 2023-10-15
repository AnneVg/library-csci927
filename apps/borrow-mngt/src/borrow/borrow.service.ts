import { Injectable, Logger, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBorrowInput } from './create-borrow.input.model';
import { UpdateBorrowInput } from './update-borrow.input.model';
import { RpcException } from '@nestjs/microservices';

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

    if (!student) throw new RpcException('Invalid student');
    if (student.status !== 'active') throw new RpcException('Student is not active');

    const book = await this.prisma.book.findFirst({
      where: {
        isbn: createBorrowInput.isbn
      }
    });
    if (!book) throw Error('Invalid book');

    if (book.status != 'available') throw new RpcException('Book is not available');

    if (book.stock < 1) throw new RpcException('Out of stock');

    const dataToInsert = {
      data: {
        dueDate: new Date(),
        status: 'onloan',
        bookId: book.id,
        memberId: student.id,
      },
    };
    return await this.prisma.$transaction(async (prisma) => {
      const borrow = await prisma.borrowingBook.create(dataToInsert);
      await prisma.book.update({
        where: {
          id: book.id,
        },
        data: {
          stock: {
            decrement: 1
          },
          status: book.stock <= 1 ? 'outofstock' : 'available',
          updatedAt: new Date()
        }
      });
      return borrow;
    });
  }

  async updateBorrow(borrowId: string, updateBorrowInput: UpdateBorrowInput) {
    const borrow = await this.prisma.borrowingBook.findUnique({
      where: {
        id: borrowId
      }
    });

    if (!borrow) throw Error('Invalid borrow');

    const book = await this.prisma.book.findUnique({
      where: {
        id: borrow.bookId
      }
    });

    const updatedBorrow = await this.prisma.borrowingBook.update({
      where: {
        id: borrow.id
      },
      data: {
        ...updateBorrowInput,
        updatedAt: new Date()
      }
    });

    if (borrow.status === 'onloan' && updateBorrowInput.status === 'returned') {
      await this.prisma.book.update({
        where: {
          id: book.id
        },
        data: {
          stock: {
            increment: 1
          },
          status: 'available',
          updatedAt: new Date()
        }
      });
    }
  
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
