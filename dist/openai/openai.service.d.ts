import OpenAI from 'openai';
import { CompletionsDto } from './dtos/completions.dto';
export declare class AIService {
    openai: OpenAI;
    askChatbot(completions: CompletionsDto): Promise<void>;
}
