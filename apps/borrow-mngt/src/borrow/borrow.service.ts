import { Injectable, Logger, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBorrowInput } from './create-borrow.input.model';

@Injectable()
export class BorrowService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) {}

  // async getAllBorrows() {
  //   const borrows = await this.prisma.borrow.findMany({});
  //   return borrows;
  // }

  // async getMemberById(id: string) {
  //   const borrow = this.prisma.borrow.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return borrow;
  // }

  async addBorrow(createBorrowInput: CreateBorrowInput) {
    const dataToInsert = {
      data: {
        ...createBorrowInput
      },
    };
    const borrow = await this.prisma.borrowingBook.create(dataToInsert);
    return borrow;
  }

  // async updateMember(id: string, updateMemberInput: UpdateMemberInput) {
  //   const member = await this.prisma.member.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       ...updateMemberInput,
  //       updatedAt: new Date(),
  //     },
  //   });
  //   return member;
  // }

  // async deleteMember(id: string) {
  //   const count = await this.prisma.member.deleteMany({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return count;
  // }
}
