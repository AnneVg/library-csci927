import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BorrowModule } from './borrow/borrow.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BorrowModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: parseInt(process.env.PORT) || 4202,
      },
    },
  );

  process.on('uncaughtException', function (err) {
    console.log(err);
  });

  await app.listen();
}
bootstrap();
