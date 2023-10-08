import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    providers: [
        MemberService
    ],
    controllers: [
        MemberController
    ]
})
export class MemberModule {}
