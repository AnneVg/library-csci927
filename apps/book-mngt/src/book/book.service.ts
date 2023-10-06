import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {

  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async getAllBooks() {
    const books = await this.prisma.book.findMany({});
    return books;
  }

  async getBookById(id: string) {
    const book = this.prisma.book.findUnique({
      where: {
        id: id
      }
    });
    return book;
  }

  async addBook() {

  }

  async updateBook() {

  }

  async deleteBook() {

  }
}
