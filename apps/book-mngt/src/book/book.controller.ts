// receive service call
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
import { MessagePattern } from '@nestjs/microservices';
import { BookService } from './book.service';
import { CreateBookInput } from './create-book.input.model';
import { UpdateBookInput } from './update-book.input.model';

@Controller()
export class BookController {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly bookService: BookService) { }

  @MessagePattern({ cmd: 'get_book' })
  async getBook(id: string) {
    return await this.bookService.getBookById(id);
  }

  @MessagePattern({ cmd: 'get_book_by_isbn' })
  async getBookByIsbn(isbn: string) {
    return await this.bookService.getBookByIsbn(isbn);
  }

  @MessagePattern({ cmd: 'check_book_available' })
  async checkBookAvailable(id: string) {
    return await this.bookService.checkAvailableBook(id);
  }

  @MessagePattern({ cmd: 'get_books' })
  async getBooks(params: {
    _start: number;
    _end: number;
    query: string;
    categoryIds: string[];
  }) {
    const { _start, _end, query, categoryIds } = params;
    const limit = _end - _start;
    const offset = _start;
    return await this.bookService.getAllBooks(limit, offset, categoryIds, query);
  }

  @MessagePattern({ cmd: 'create_book' })
  async createBook(bookInput: CreateBookInput) {
    try {
      const book = await this.bookService.addBook(bookInput);
      return book;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @MessagePattern({ cmd: 'update_book' })
  async updateBook(
    bookInput: UpdateBookInput,
  ) {
    try {
      const { id } = bookInput;
      if (!id) throw Error('Invalid arguments');
      const book = await this.bookService.updateBook(id, bookInput);
      return book;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @MessagePattern({ cmd: 'delete_book' })
  async deleteBook(id: string) {
    try {
      await this.bookService.deleteBook(id);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
