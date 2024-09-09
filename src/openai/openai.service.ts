import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { CompletionsDto } from './dtos/completions.dto';

@Injectable()
export class AIService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async askChatbot(completions: CompletionsDto) {
    const faq =
      'You are a technical support chatbot for https://jobboard-pi.vercel.app/dashboard. Here are some details about the services provided: 1. https://jobboard-pi.vercel.app/dashboard is a job board service. 2. The main features include: adding job offers, looking for a new job. 3. You can add or delete offer to favorites.';

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Please follow instructions here: ${faq}`,
          },
          { role: 'user', content: completions.message },
        ],
      });

      return {
        output: {
          userPrompt: completions.message,
          response: completion,
        },
      };
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);

      throw new InternalServerErrorException(
        'Failed to get a response from OpenAI.'
      );
    }
  }
}
