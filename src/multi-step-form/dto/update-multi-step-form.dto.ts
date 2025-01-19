import { PartialType } from '@nestjs/mapped-types';
import { CreateMultiStepFormDto } from './create-multi-step-form.dto';

export class UpdateMultiStepFormDto extends PartialType(CreateMultiStepFormDto) {}
