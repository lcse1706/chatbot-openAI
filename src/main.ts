import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: ['https://jobboard-pi.vercel.app', 'http://localhost:3002'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = process.env.PORT || 3001; //

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${`http://localhost:${port}`}/${globalPrefix}`
  );
}
bootstrap();
