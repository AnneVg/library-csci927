import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    BorrowService,
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
  controllers: [BorrowController],
})
export class BorrowModule {}
