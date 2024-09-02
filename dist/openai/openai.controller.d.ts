import { AIService } from './openai.service';
import { CompletionsDto } from './dtos/completions.dto';
export declare class AIController {
    private readonly aiService;
    constructor(aiService: AIService);
    askChat(completionsDto: CompletionsDto): Promise<void>;
}
