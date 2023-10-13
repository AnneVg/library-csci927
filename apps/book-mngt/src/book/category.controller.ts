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
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateBookInput } from './create-book.input.model';
import { UpdateBookInput } from './update-book.input.model';

@Controller('categories')
export class CategoryController {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'get_category' })
  async getCategory(id: string) {
    return await this.categoryService.getCategoryById(id);
  }

  @MessagePattern({ cmd: 'get_categories' })
  async getCategories() {
    return await this.categoryService.getAllCategories();
  }

  @MessagePattern({ cmd: 'update_category' })
  async updateCategory(
    input: { id: string; name: string },
  ) {
    try {
      const { id } = input;
      if (!id) throw Error('Invalid arguments');
      const { name } = input;
      const category = await this.categoryService.updateCategory(id, name);
      return category;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
