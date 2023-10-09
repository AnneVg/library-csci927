import { Injectable, Logger, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookInput } from './create-book.input.model';
import { UpdateBookInput } from './update-book.input.model';

@Injectable()
export class CategoryService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories() {
    const categories = await this.prisma.category.findMany({});
    return categories;
  }

  async getCategoryById(id: string) {
    const category = this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    return category;
  }

  async updateCategory(id: string, name: string) {
    const category = await this.prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    });
    return category;
  }
}
