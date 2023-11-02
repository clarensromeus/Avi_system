import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token', // client-server token authorization
      'Authorization',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE,PATCH',
    origin: true,
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
    preflightContinue: false,
  });
  app.useStaticAssets(join(__dirname, '../uploads'));
  await app.listen(4000);
}
bootstrap();
