import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MultiStepFormService } from './multi-step-form.service';
import { UpdateMultiStepFormDto } from './dto/update-multi-step-form.dto';
import { Application } from '@prisma/client';
import { RoleGuard } from 'src/guards/role/role.guard';
import { ValidationPipe } from './utils/validation/validation.pipe';

@Controller('applyform')
export class MultiStepFormController {
  constructor(private readonly multiStepFormService: MultiStepFormService) {}

  @UseGuards(RoleGuard)
  @Get()
  findAll() {
    return this.multiStepFormService.findAll();
  }

  @Get('/user')
  findOne(@Query('email') email: string) {
    return this.multiStepFormService.findOne(email);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateMultiStepFormDto: UpdateMultiStepFormDto,
  ) {
    return this.multiStepFormService.update(+id, updateMultiStepFormDto);
  }

  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.multiStepFormService.remove(+id);
  }

  @Post('/step/:stepnumber')
  applyform(
    @Param('stepnumber') step: ParseIntPipe,
    @Body(new ValidationPipe()) formValue: Application,
  ) {
    return this.multiStepFormService.applyForm(formValue, +step);
  }
}
