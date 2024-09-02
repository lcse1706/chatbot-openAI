import { Body, Controller, Post } from '@nestjs/common';

import { AIService } from './openai.service';
import { CompletionsDto } from './dtos/completions.dto';

@Controller('ai') // http://localhost:3001/api/ai
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('completions')
  askChat(@Body() completionsDto: CompletionsDto) {
    return this.aiService.askChatbot(completionsDto);
  }
}
