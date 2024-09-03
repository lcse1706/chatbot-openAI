import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AIModule } from './openai/openai.module';

const config = ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
});

@Module({
  imports: [AIModule, config],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
