import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { CompletionsDto } from './dtos/completions.dto';

@Injectable()
export class AIService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async askChatbot(completions: CompletionsDto) {
    const faq = '1. You can add or delete offer to favorites.';

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // Ensure this model exists, otherwise use 'gpt-3.5-turbo' or another valid model
        messages: [
          {
            role: 'system',
            content: `You are a technical support chatbot for https://jobboard-pi.vercel.app/dashboard. Here are some details about the services provided: 1. https://jobboard-pi.vercel.app/dashboard is a job board service. 2. The main features include: adding job offers, looking for a new job. 3. Every feature which service offer are on the following FAQ: ${faq}`,
          },
          { role: 'user', content: completions.message },
        ],
      });

      // Log the completion response for debugging
      console.log(completion);

      // Return the assistant's response
      return {
        output: {
          userPrompt: completions.message,
          response: completion,
        },
      };
    } catch (error) {
      // Log the error
      console.error('Error communicating with OpenAI:', error);

      // Throw an error that will be returned as a 500 Internal Server Error response
      throw new InternalServerErrorException(
        'Failed to get a response from OpenAI.'
      );
    }
  }
}
