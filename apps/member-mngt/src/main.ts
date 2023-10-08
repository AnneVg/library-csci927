import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MemberModule } from './member/member.module';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MemberModule,
    {
      transport: Transport.TCP,
      options: {
        port: parseInt(process.env.PORT) || 4201
      }
    },
  );

  process.on('uncaughtException', function (err) {
    console.log(err);
  });


  await app.listen();
}
bootstrap();
