import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:8080'],
      credentials: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  ConfigModule.forRoot({ isGlobal: true });
  await app.listen(3000);
}
bootstrap();
