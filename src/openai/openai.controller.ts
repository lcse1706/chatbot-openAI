import { Body, Controller, Post, Req } from '@nestjs/common';
import { AIService } from './openai.service';
import { CompletionsDto } from './dtos/completions.dto';
import { Request } from 'express';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('completions')
  async askChatbot(
    @Body() completionsDto: CompletionsDto,
    @Req() request: Request
  ) {
    return this.aiService.askChatbot(completionsDto, request);
  }
}
