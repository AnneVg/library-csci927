import { Body, Controller, Delete, Get, HttpCode, Inject, Logger, OnApplicationBootstrap, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { ICreateMemberInput } from '../interfaces/member';

@Controller("members")
export class MemberController implements OnApplicationBootstrap {

  private logger: Logger = new Logger(this.constructor.name);
  constructor(
    @Inject('MEMBERS_SERVICE') private memberClientApp : ClientProxy
  ) { }

  async onApplicationBootstrap() {
    await this.memberClientApp.connect();
  }

  @Get(':id')
  async getMember(
    @Param('id') id: string,
  ) {
    const pattern = {cmd: 'get_member'};
    try {
      return await this.memberClientApp.send<string>(pattern, id).pipe(
        map((message) => message)
      );
    } catch (err) {
      this.logger.error(err);
    }
    
  }

  @Get()
  async getMembers() {
    const pattern = {cmd: 'get_members'};
    try {
      return await this.memberClientApp.send(pattern, {}).pipe(
        map((message) => message)
      );
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Post()
  async createMember(
    @Body() memberInput: ICreateMemberInput
  ) {
    try {
      const pattern = { cmd: 'create_member' };
      return await this.memberClientApp.send(pattern, memberInput).pipe(
        map((message) => message)
      );
    } catch (err) {
      this.logger.error(err);
    }
  }

  // @Patch(':id')
  // @ApiParam({ name: 'id', description: 'The ID of the member' })
  // async updateMember(
  //   @Param('id') id: string,
  //   @Body() memberInput: IUpdateMemberInput
  // ) {
  //   try {
  //     if (!id) throw Error('Invalid arguments');
  //     if (id !== memberInput.id) throw new Error('Invalid arguments');
      
  //     const member = await this.memberClientApp.updateMember(id, memberInput);
  //     return member;
  //   } catch (err) {
  //     this.logger.error(err);
  //   }
  // }

  @Delete(':id')
  @HttpCode(204)
  async deleteMember(
    @Param('id') id: string
  ) {
    try {
      const pattern = {cmd: 'delete_member'};
      console.log('delete_member', id);
      return await this.memberClientApp.send<string>(pattern, id).pipe(
        (message) => message
      );
    } catch (err) {
      this.logger.error(err);
    }
  }
}
