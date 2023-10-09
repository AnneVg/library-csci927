import { Injectable, Logger, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookInput } from './create-book.input.model';
import { UpdateBookInput } from './update-book.input.model';
import { Prisma } from 'database';

@Injectable()
export class BookService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) { }

  async getAllBooks(limit: number, offset: number, categoryIds: string[], query?: string) {
    const whereCondition: Prisma.BookWhereInput = query ? {
      
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive'

          }
        },
        {
          author: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          shortDescription: {
            contains: query,
            mode: 'insensitive'
          }
        }
      ]
    } : {};
    const books = await this.prisma.book.findMany({
      take: Number(limit),
      skip: Number(offset),
      where: whereCondition
    });

    return books;
  }

  async getBookById(id: string) {
    const book = this.prisma.book.findUnique({
      where: {
        id: id,
      },
    });
    return book;
  }

  async addBook(createBookInput: CreateBookInput) {
    const dataToInsert = {
      data: {
        ...createBookInput,
      },
    };
    const book = await this.prisma.book.create(dataToInsert);
    return book;
  }

  async updateBook(id: string, updateBookInput: UpdateBookInput) {
    const book = await this.prisma.book.update({
      where: {
        id: id,
      },
      data: {
        ...updateBookInput,
        updatedAt: new Date(),
      },
    });
    return book;
  }

  async deleteBook(id: string) {
    await this.prisma.book.delete({
      where: {
        id: id,
      },
    });
  }
}
