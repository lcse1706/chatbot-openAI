import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = 3001;

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
