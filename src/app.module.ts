import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AIModule } from './openai/openai.module';

@Module({
  imports: [AIModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
