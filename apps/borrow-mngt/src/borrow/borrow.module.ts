import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [BorrowService],
  controllers: [BorrowController],
})
export class BorrowModule {}
