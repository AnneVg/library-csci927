import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [PrismaModule],
  providers: [
    CategoryService,
    BookService
  ],
  controllers: [
    CategoryController, 
    BookController,
  ],
})
export class BookModule {}
