import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from './book.service';

@Controller()
export class BookController {
  constructor(
    private readonly bookService: BookService
  ) { }

  @Get(':id')
  async getBook(
    @Param('id') id: string,
  ) {
    return await this.bookService.getBookById(id);
  }
}
