import { Controller, Get, Param, Post, Body, Logger, Delete, HttpCode, Patch } from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateMemberInput } from './create-member.input.model';
import { UpdateMemberInput } from './update-member.input.model';

@Controller("members")
export class MemberController {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(
    private readonly memberService: MemberService,
  ) { }

  @Get(':id')
  async getMember(
    @Param('id') id: string,
  ) {
    return await this.memberService.getMemberById(id);
  }

  @Get()
  async getMembers() {
    return await this.memberService.getAllMembers();
  }

  @Post()
  async createMember(
    @Body() memberInput: CreateMemberInput
  ) {
    try {
      const member = await this.memberService.addMember(memberInput);
      return member;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'The ID of the member' })
  async updateMember(
    @Param('id') id: string,
    @Body() memberInput: UpdateMemberInput
  ) {
    try {
      if (!id) throw Error('Invalid arguments');
      const member = await this.memberService.updateMember(id, memberInput);
      return member;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteMember(
    @Param('id') id: string
  ) {
    try {
      await this.memberService.deleteMember(id);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
