import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BookModule } from './book/book.module';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: parseInt(process.env.PORT) || 4203,
      },
    },
  );

  

  process.on('uncaughtException', function (err) {
    console.log(err);
  });

  

  await app.listen();
}
bootstrap();
