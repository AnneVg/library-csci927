import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnApplicationBootstrap,
  Param,
  Patch
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiParam } from '@nestjs/swagger';
import { map } from 'rxjs/operators';

@Controller('categories')
export class CategoryApiController  implements OnApplicationBootstrap {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(
    @Inject('BOOKS_SERVICE') private bookClientApp: ClientProxy
  ) { }

  async onApplicationBootstrap() {
    await this.bookClientApp.connect();
  }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    const pattern = { cmd: 'get_category' };
    try {
      return await this.bookClientApp
        .send(pattern, id)
        .pipe(map((message) => message))
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Get()
  async getCategories() {
    const pattern = { cmd: 'get_categories' };
    try {
      return await this.bookClientApp
        .send(pattern, {})
        .pipe(map((message) => message))
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  async updateCategory(
    @Param('id') id: string,
    @Body() input: { name: string },
  ) {
    const { name } = input;
    const pattern = { cmd: 'update_category' };
    try {
      return await this.bookClientApp
        .send(pattern, { id, name })
        .pipe(map((message) => message))
    } catch (err) {
      this.logger.error(err);
    }
  }
}
