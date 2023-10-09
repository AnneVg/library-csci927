import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Logger,
  Delete,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiParam, ApiBody } from '@nestjs/swagger';
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
  async getBooks() {
    return await this.bookService.getAllBooks();
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
