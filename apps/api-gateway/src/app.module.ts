import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { RpcExceptionToHttpExceptionFilter } from '../middleware/rpc-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    ApiModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RpcExceptionToHttpExceptionFilter,
    }
  ],
})
export class AppModule {}
