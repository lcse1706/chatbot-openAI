import { Module } from '@nestjs/common';
import { AIController } from './openai.controller';
import { AIService } from './openai.service';

@Module({
  imports: [],
  controllers: [AIController],
  providers: [AIService],
})
export class AIModule {}
