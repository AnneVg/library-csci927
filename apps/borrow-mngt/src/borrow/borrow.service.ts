import { Inject, Injectable, Logger, OnApplicationBootstrap, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBorrowInput } from './create-borrow.input.model';
import { UpdateBorrowInput } from './update-borrow.input.model';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BorrowService implements OnApplicationBootstrap {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject('MEMBERS_SERVICE') private memberClientApp: ClientProxy,
    @Inject('BOOKS_SERVICE') private bookClientApp: ClientProxy,
  ) { }

  async onApplicationBootstrap() {
    await this.memberClientApp.connect();
    await this.bookClientApp.connect();
  }

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

    const memberPattern = { cmd: 'check_member_by_student_id'};
    const studentObs = this.memberClientApp
      .send(memberPattern, createBorrowInput.studentId);

    const student = await lastValueFrom(studentObs);

    const bookPattern = { cmd: 'check_book_available_by_isbn'};
    const bookObs = this.bookClientApp
      .send(bookPattern, createBorrowInput.isbn);

    const book = await lastValueFrom(bookObs);

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
