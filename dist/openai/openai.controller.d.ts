import { AIService } from './openai.service';
import { CompletionsDto } from './dtos/completions.dto';
export declare class AIController {
    private readonly aiService;
    constructor(aiService: AIService);
    askChatbot(completionsDto: CompletionsDto): Promise<{
        output: {
            userPrompt: string;
            response: import("openai/resources").ChatCompletion;
        };
    }>;
}
