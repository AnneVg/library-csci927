import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BookService } from './book.service';

@Module({
    imports: [
        PrismaModule
    ],
    providers: [
        BookService
    ]
})
export class BookModule {}
