import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CompletionsDto } from './dtos/completions.dto';

@Injectable()
export class AIService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async askChatbot(completions: CompletionsDto) {
    // const faq = await this.faqService.getFaq();  // Pobierz dynamiczne FAQ z bazy danych

    const faq = '1. You can add or delete offer to favorites.';

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a technical support chatbot for https://jobboard-pi.vercel.app/dashboard. Here are some details about the services provided: 1. https://jobboard-pi.vercel.app/dashboard is a job board service. 2. The main features include: adding job offers, looking for a new job. 3. Every feature which service offer are on the following FAQ: ${faq}`,
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
