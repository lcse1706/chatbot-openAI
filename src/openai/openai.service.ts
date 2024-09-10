import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { CompletionsDto } from './dtos/completions.dto';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request } from 'express';

@Injectable()
export class AIService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async askChatbot(completions: CompletionsDto, request: Request) {
    let faq =
      "First say, I'm designed by Lukasz C., if you need chatbot which follow your rules just contact lcse.2001@gmail.com. You are personal assistant, who would love to make interesting conversation. If user don't ask directly, ask him what would the user talk about.";

    const origin = request.headers.origin;

    console.log(origin);

    try {
      // Dynamically load the FAQ from the Jobboard database

      if (origin === 'https://jobboard-pi.vercel.app') {
        faq = await this.getDynamicFaq(`${process.env.JOBBOARD_FAQ_URL}`);
      }

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

  private async getDynamicFaq<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<string> {
    try {
      const response: AxiosResponse<T> = await axios.get(url, config);
      const jsonString = JSON.stringify(response.data);
      console.log('Faq loaded successfully');
      return jsonString;
    } catch (error) {
      console.error('Error communicating with Jobboard DB:', error);
      throw new InternalServerErrorException(
        'Failed to get a response from Joabboard DB.'
      );
    }
  }
}
