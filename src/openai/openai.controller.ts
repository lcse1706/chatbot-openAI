import { Controller, Post, Options, Body } from '@nestjs/common';
import { AIService } from './openai.service';
import { CompletionsDto } from './dtos/completions.dto';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('completions')
  askChatbot(@Body() completionsDto: CompletionsDto) {
    return this.aiService.askChatbot(completionsDto);
  }
}
