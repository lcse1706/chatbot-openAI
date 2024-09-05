"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let AIService = class AIService {
    constructor() {
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async askChatbot(completions) {
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
        return {
            output: {
                userPrompt: completions.message,
                response: completion,
            },
        };
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)()
], AIService);
//# sourceMappingURL=openai.service.js.map