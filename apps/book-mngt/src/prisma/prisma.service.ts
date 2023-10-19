import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from 'library-db';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private logger: Logger) {
    super();
    // super({
    //   log: [
    //     { emit: 'event', level: 'query' },
    //     { emit: 'stdout', level: 'info' },
    //     { emit: 'stdout', level: 'warn' },
    //     { emit: 'stdout', level: 'error' },
    //   ],
    //   errorFormat: 'colorless',
    // });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
