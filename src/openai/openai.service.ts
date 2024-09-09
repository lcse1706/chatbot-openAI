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
      'You are a technical support chatbot for Job Board App. Here are some details about the services provided: 1. Adding job offers. 2. Delete job offers. 3. Adding and deleting to/from favorites through clicking star in the corner of offer. 4. Possibility of checking location on maps from google. 5. User can log in through registering or google account.  ';

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
