import { Test, TestingModule } from '@nestjs/testing';
import { MultiStepFormService } from './multi-step-form.service';

describe('MultiStepFormService', () => {
  let service: MultiStepFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultiStepFormService],
    }).compile();

    service = module.get<MultiStepFormService>(MultiStepFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
