import {
    Body,
    Controller,
    Get,
    Inject,
    Logger,
    OnApplicationBootstrap,
    Param,
    Post
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { ICreateBorrowInput } from '../interfaces/borrow';
  
  @Controller('members')
  export class BorrowController implements OnApplicationBootstrap {
    private logger: Logger = new Logger(this.constructor.name);
    constructor(
      @Inject('BORROWS_SERVICE') private borrowClientApp: ClientProxy,
    ) {}
  
    async onApplicationBootstrap() {
      await this.borrowClientApp.connect();
    }
  
    @Get(':id')
    async getBorrow(@Param('id') id: string) {
      const pattern = { cmd: 'get_borrow' };
      try {
        return await this.borrowClientApp
          .send<string>(pattern, id)
          .pipe(map((message) => message));
      } catch (err) {
        this.logger.error(err);
      }
    }
  
    @Get()
    async getBorrows() {
      const pattern = { cmd: 'get_borrows' };
      try {
        return await this.borrowClientApp
          .send(pattern, {})
          .pipe(map((message) => message));
      } catch (err) {
        this.logger.error(err);
      }
    }
  
    @Post()
    async createBorrow(@Body() borrowInput: ICreateBorrowInput) {
      try {
        const pattern = { cmd: 'create_member' };
        return await this.borrowClientApp
          .send(pattern, borrowInput)
          .pipe(map((message) => message));
      } catch (err) {
        this.logger.error(err);
      }
    }
  }
  