import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: [
      'https://jobboard-pi.vercel.app',
      'https://jobboard-pi.vercel.app/dashboard',
      'https://chatbot-open-ai-theta.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = process.env.PORT || 3001; //

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${`http://localhost:${port}`}/${globalPrefix}`
  );
}
bootstrap();
