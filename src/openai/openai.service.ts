import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CompletionsDto } from './dtos/completions.dto';

@Injectable()
export class AIService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async askChatbot(completions: CompletionsDto) {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful programmer please give IT advices.',
        },
        { role: 'user', content: completions.message },
      ],
    });

    console.log(completion);
    // console.log(completion.choices[0]);
    return {
      output: {
        userPrompt: completions.message,
        response: completion,
      },
    };
  }
}
