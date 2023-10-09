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
import { ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateBookInput } from './create-book.input.model';
import { UpdateBookInput } from './update-book.input.model';

@Controller('categories')
export class CategoryController {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return await this.categoryService.getCategoryById(id);
  }

  @Get()
  async getCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  async updateCategory(
    @Param('id') id: string,
    @Body() input: { name: string },
  ) {
    try {
      if (!id) throw Error('Invalid arguments');
      const { name } = input;
      const category = await this.categoryService.updateCategory(id, name);
      return category;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
