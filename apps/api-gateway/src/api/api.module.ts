import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';
import { MemberApiController } from './member-api.controller';
import { CategoryApiController } from './category-api.controller';
import { BookApiController } from './book-api.controller';
import { BorrowApiController } from './borrow-api.controller';

@Module({
  imports: [PrismaModule],
  providers: [
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
    },
    {
      provide: 'BOOKS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('BOOK_SERVICE_HOST'),
            port: configService.get('BOOK_SERVICE_PORT'),
          },
        });
      },
    }
    
  ],
  controllers: [
    CategoryApiController, 
    BookApiController, 
    MemberApiController,
    BorrowApiController
  ],
})
export class ApiModule {}
