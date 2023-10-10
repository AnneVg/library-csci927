import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MemberController } from './member.controller';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { BorrowController } from './borrow.controller';

@Module({
  imports: [PrismaModule],
  providers: [
    CategoryService,
    BookService,
    {
      provide: 'MEMBERS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('MEMBER_SERVICE_HOST'),
            port: configService.get('MEMBER_SERVICE_PORT'),
          },
        });
      },
    },
    {
      provide: 'BORROWS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('BORROW_SERVICE_HOST'),
            port: configService.get('BORROW_SERVICE_PORT'),
          },
        });
      }
    }
  ],
  controllers: [
    CategoryController, 
    BookController, 
    MemberController,
    BorrowController
  ],
})
export class BookModule {}
