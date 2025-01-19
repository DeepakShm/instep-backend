import { Test, TestingModule } from '@nestjs/testing';
import { MultiStepFormController } from './multi-step-form.controller';
import { MultiStepFormService } from './multi-step-form.service';

describe('MultiStepFormController', () => {
  let controller: MultiStepFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultiStepFormController],
      providers: [MultiStepFormService],
    }).compile();

    controller = module.get<MultiStepFormController>(MultiStepFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
