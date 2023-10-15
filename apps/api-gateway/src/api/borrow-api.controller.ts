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
  @UseFilters(RpcExceptionToHttpExceptionFilter)
  async createBorrow(@Body() borrowInput: ICreateBorrowInput) {

    const patternGetMember = { cmd: 'get_member_by_student_id' };
    const memberObs = await this.memberClientApp
      .send(patternGetMember, borrowInput.studentId);

    const member = await lastValueFrom(memberObs);
    if (!member) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      message: `Student with id "${borrowInput.studentId}" does not exist.`
    }, HttpStatus.NOT_FOUND);

    if (member.status !== 'active') throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      message: `Student with id "${borrowInput.studentId}" is not active.`
    }, HttpStatus.BAD_REQUEST);

    const patternGetBookByIsbn = { cmd: 'get_book_by_isbn' };
    const bookObs = await this.bookClientApp
      .send(patternGetBookByIsbn, borrowInput.isbn);
    const book = await lastValueFrom(bookObs);

    if (!book) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: `Book with isbn "${borrowInput.isbn}" does not exist in the library.`
      }, HttpStatus.NOT_FOUND);
    }

    if (book.status !== 'available') {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: `Book with isbn "${borrowInput.isbn}" is not available.`
      }, HttpStatus.BAD_REQUEST);
    }

    if (book.stock < 1) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: `Book with isbn "${borrowInput.isbn}" is out of stock.`
      }, HttpStatus.BAD_REQUEST);
    }

    const patternCheckBookAvaiable = { cmd: 'check_book_available' };
    const bookAvailableObs = await this.bookClientApp
      .send(patternCheckBookAvaiable, book.id);

    const bookAvailable = await lastValueFrom(bookAvailableObs);

    if (!bookAvailable) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: `Book with isbn "${borrowInput.isbn}" is not available.`
      }, HttpStatus.BAD_REQUEST)
    }

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
