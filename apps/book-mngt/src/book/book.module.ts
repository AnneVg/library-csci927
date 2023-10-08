import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MemberController } from './member.controller';

@Module({
    imports: [
        PrismaModule
    ],
    providers: [
        BookService,
        {
            provide: 'MEMBERS_SERVICE',
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('MEMBER_SERVICE_HOST'),
                        port: configService.get('MEMBER_SERVICE_PORT')
                    }
                })
            }
        }
    ],
    controllers: [
        BookController,
        MemberController
    ]
})
export class BookModule { }
