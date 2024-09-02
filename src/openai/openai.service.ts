import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CompletionsDto } from './dtos/completions.dto';

@Injectable()
export class AIService {
  openai = new OpenAI();

  async askChatbot(completions: CompletionsDto) {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant with jobboard app.',
        },
        {
          role: 'user',
          content: completions.message,
        },
      ],
    });

    console.log(completion);
  }
}
