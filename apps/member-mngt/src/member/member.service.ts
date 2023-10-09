import { Injectable, Logger, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMemberInput } from './create-member.input.model';
import { UpdateMemberInput } from './update-member.input.model';

@Injectable()
export class MemberService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAllMembers() {
    const members = await this.prisma.member.findMany({});
    return members;
  }

  async getMemberById(id: string) {
    const member = this.prisma.member.findUnique({
      where: {
        id: id,
      },
    });
    return member;
  }

  async addMember(createMemberInput: CreateMemberInput) {
    const dataToInsert = {
      data: {
        ...createMemberInput,
      },
    };
    const member = await this.prisma.member.create(dataToInsert);
    return member;
  }

  async updateMember(id: string, updateMemberInput: UpdateMemberInput) {
    const member = await this.prisma.member.update({
      where: {
        id: id,
      },
      data: {
        ...updateMemberInput,
        updatedAt: new Date(),
      },
    });
    return member;
  }

  async deleteMember(id: string) {
    const count = await this.prisma.member.deleteMany({
      where: {
        id: id,
      },
    });
    return count;
  }
}
