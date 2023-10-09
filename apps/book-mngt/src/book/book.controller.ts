import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookInput } from './create-book.input.model';
import { UpdateBookInput } from './update-book.input.model';

@Controller('books')
export class BookController {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly bookService: BookService) {}

  @Get(':id')
  async getBook(@Param('id') id: string) {
    return await this.bookService.getBookById(id);
  }

  @Get()
  async getBooks(
    @Query('_start') _start: number,
    @Query('_end') _end: number,
    @Query('name_like') query: string,
    @Query('categoryId') categoryIds: string[]
  ) {
    const limit = _end - _start;
    const offset = _start;
    return await this.bookService.getAllBooks(limit, offset, categoryIds, query);
  }

  @Post()
  async createBook(@Body() bookInput: CreateBookInput) {
    try {
      const book = await this.bookService.addBook(bookInput);
      return book;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  async updateBook(
    @Param('id') id: string,
    @Body() bookInput: UpdateBookInput,
  ) {
    try {
      if (!id) throw Error('Invalid arguments');
      const book = await this.bookService.updateBook(id, bookInput);
      return book;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteBook(@Param('id') id: string) {
    try {
      await this.bookService.deleteBook(id);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
