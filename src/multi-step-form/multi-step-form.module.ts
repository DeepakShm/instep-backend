import { Module } from '@nestjs/common';
import { MultiStepFormService } from './multi-step-form.service';
import { MultiStepFormController } from './multi-step-form.controller';

@Module({
  controllers: [MultiStepFormController],
  providers: [MultiStepFormService],
})
export class MultiStepFormModule {}
