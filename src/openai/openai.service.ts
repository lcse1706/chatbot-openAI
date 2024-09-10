import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { CompletionsDto } from './dtos/completions.dto';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class AIService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async askChatbot(completions: CompletionsDto) {
    let faq =
      'You are a programmer assistant. You know any answer according to IT world';

    // const faq = await this.getDynamicFaq(`${process.env.JOBBOARD_FAQ_URL}`);

    console.log(origin);

    try {
      // if (origin === 'https://jobboard-pi.vercel.app') {
      //   faq = await this.getDynamicFaq(`${process.env.JOBBOARD_FAQ_URL}`);
      // }

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

      // console.log(completion);

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

  // private async getDynamicFaq<T>(
  //   url: string,
  //   config?: AxiosRequestConfig
  // ): Promise<string> {
  //   try {
  //     const response: AxiosResponse<T> = await axios.get(url, config);
  //     const jsonString = JSON.stringify(response.data);
  //     console.log('Faq loaded successfully');
  //     return jsonString;
  //   } catch (error) {
  //     console.error('Error communicating with Jobboard DB:', error);
  //     throw new InternalServerErrorException(
  //       'Failed to get a response from Joabboard DB.'
  //     );
  //   }
  // }
}
