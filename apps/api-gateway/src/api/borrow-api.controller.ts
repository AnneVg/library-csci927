// call borrow.controller in borrow service
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  OnApplicationBootstrap,
  Param,
  Patch,
  Post,
  UseFilters
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { RpcExceptionToHttpExceptionFilter } from '../../middleware/rpc-exception.filter';
import { ICreateBorrowInput, IUpdateBorrowInput } from '../interfaces/borrow';

@Controller('borrows')
export class BorrowApiController implements OnApplicationBootstrap {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(
    @Inject('MEMBERS_SERVICE') private memberClientApp: ClientProxy,
    @Inject('BOOKS_SERVICE') private bookClientApp: ClientProxy,
    @Inject('BORROWS_SERVICE') private borrowClientApp: ClientProxy,
  ) { }

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
    
    const pattern = { cmd: 'create_borrow' };
    return await lastValueFrom(this.borrowClientApp
      .send(pattern, borrowInput));
      
  }

  @Patch(':id')
  async updateBorrow(@Param('id') id: string, @Body() borrowInput: IUpdateBorrowInput) {
    try {
      borrowInput.id = id;
      const pattern = { cmd: 'update_borrow' };
      return await this.borrowClientApp
        .send(pattern, borrowInput)
        .pipe(map((message) => message));
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Delete(':id')
  async deleteBorrow(@Param('id') id: string) {
    const pattern = { cmd: 'delete_borrow' };
    try {
      return await this.borrowClientApp
        .send(pattern, id)
        .pipe(map((message) => message));
    } catch (err) {
      this.logger.error(err);
    }
  }
}
