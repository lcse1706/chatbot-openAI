import { Test, TestingModule } from '@nestjs/testing';
import { AIService } from './openai.service';

describe('OpenaiService', () => {
  let service: AIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AIService],
    }).compile();

    service = module.get<AIService>(AIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
