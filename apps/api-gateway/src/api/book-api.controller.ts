// receive service call
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Logger,
  OnApplicationBootstrap,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { CreateBookInput } from './create-book.input.model';
import { UpdateBookInput } from './update-book.input.model';

@Controller('books')
export class BookApiController implements OnApplicationBootstrap {

  private logger: Logger = new Logger(this.constructor.name);
  constructor(
    @Inject('BOOKS_SERVICE') private bookClientApp: ClientProxy
  ) {
  }

  async onApplicationBootstrap() {
    await this.bookClientApp.connect();
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    const pattern = { cmd: 'get_book' };
    try {
      return await this.bookClientApp
        .send<string>(pattern, id)
        .pipe(map((message) => message))
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Get()
  async getBooks(
    @Query('_start') _start: number,
    @Query('_end') _end: number,
    @Query('name_like') query: string,
    @Query('categoryId') categoryIds: string[]
  ) {

    const pattern = { cmd: 'get_books' };
    try {
      const params = {
        _start,
        _end,
        query,
        categoryIds
      };
      return await this.bookClientApp
        .send(pattern, params)
        .pipe(map((message) => message))
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Post()
  async createBook(@Body() bookInput: CreateBookInput) {
    const pattern = { cmd: 'create_book' };
    try {
      return await this.bookClientApp
        .send<CreateBookInput>(pattern, bookInput)
        .pipe(map((message) => message));
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() bookInput: UpdateBookInput,
  ) {
    try {
      const pattern = { cmd: 'update_book' };
      try {
        bookInput.id = id;
        return await this.bookClientApp
          .send<UpdateBookInput>(pattern, bookInput)
          .pipe(map((message) => message))
      } catch (err) {
        this.logger.error(err);
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteBook(@Param('id') id: string) {
    const pattern = { cmd: 'update_book' };
    try {
      return await this.bookClientApp
        .send<string>(pattern, id)
        .pipe(map((message) => message))
    } catch (err) {
      this.logger.error(err);
    }
  }
}
