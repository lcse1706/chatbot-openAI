import { Body, Controller, Post, Get } from '@nestjs/common';

import { AIService } from './openai.service';
import { CompletionsDto } from './dtos/completions.dto';

@Controller('ai') // http://localhost:3001/api/ai
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('completions')
  askChatbot(@Body() completionsDto: CompletionsDto) {
    return this.aiService.askChatbot(completionsDto);
  }
}
