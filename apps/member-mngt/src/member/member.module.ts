import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';

@Module({
    imports: [
        PrismaModule
    ],
    providers: [
        MemberService
    ],
    controllers: [
        MemberController
    ]
})
export class MemberModule {}
