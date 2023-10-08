import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [MemberModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
