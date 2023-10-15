import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateMemberInput } from './create-member.input.model';
import { MemberService } from './member.service';
import { UpdateMemberInput } from './update-member.input.model';

@Controller()
export class MemberController {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly memberService: MemberService) {}

  @MessagePattern({ cmd: 'get_member' })
  async getMember(id: string) {
    return await this.memberService.getMemberById(id);
  }

  @MessagePattern({ cmd: 'get_member_by_student_id' })
  async getMemberByStudentId(studentId: string) {
    return  await this.memberService.getMemberByStudentId(studentId);
  }

  @MessagePattern({ cmd: 'get_members' })
  async getMembers() {
    return await this.memberService.getAllMembers();
  }

  @MessagePattern({ cmd: 'create_member' })
  async createMember(memberInput: CreateMemberInput) {
    try {
      const member = await this.memberService.addMember(memberInput);
      return member;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @MessagePattern({ cmd: 'update_member' })
  async updateMember(memberInput: UpdateMemberInput) {
    try {
      const { id } = memberInput;
      if (!id) throw Error('Invalid arguments');
      const member = await this.memberService.updateMember(id, memberInput);
      return member;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @MessagePattern({ cmd: 'delete_member' })
  async deleteMember(id: string) {
    try {
      return await this.memberService.deleteMember(id);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
