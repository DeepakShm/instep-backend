import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Application, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMultiStepFormDto } from './dto/create-multi-step-form.dto';
import { UpdateMultiStepFormDto } from './dto/update-multi-step-form.dto';
import { validateSchema } from './utils/stepForm.validation';

@Injectable()
export class MultiStepFormService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createMultiStepFormDto: CreateMultiStepFormDto) {
    return 'This action adds a new multiStepForm';
  }

  async findAll(): Promise<Application[]> {
    try {
      return await this.prismaService.application.findMany();
    } catch (error) {
      throw new BaseExceptionFilter();
    }
  }

  async findOne(email: string): Promise<Application> {
    try {
      const res = await this.prismaService.application.findUnique({
        where: { email: email },
      });
      if (res) {
        return res;
      }
      throw new NotFoundException(
        `Could not find application details with this ${email} email`,
      );
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BaseExceptionFilter();
    }
  }

  update(id: number, updateMultiStepFormDto: UpdateMultiStepFormDto) {
    return `This action updates a #${id} multiStepForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} multiStepForm`;
  }

  async applyForm(
    formValue: Application,
    step: number,
  ): Promise<{ msg: string; application: Application }> {
    console.log(step);
    if (step <= 3 && step >= 1) {
      const value = await validateSchema(formValue, step);
      // switch case
      switch (step) {
        case 1:
          return this.savePersonal(value);
          break;
        case 2:
          return await this.saveEducation(value);
          break;
        case 3:
          return await this.saveInternship(value);
          break;
        default:
          return;
          break;
      }
    }

    throw new BadRequestException('Invalid Step number');
  }

  async savePersonal(value: Application) {
    try {
      const res = await this.prismaService.application.create({
        data: { ...value, prevStep: 0, currStep: 1, nextStep: 2 },
      });

      return {
        msg: 'First Step Success',
        application: res,
      };
    } catch (e) {
      //TODO: Create custom prisma exception filter.
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.log(e);
          throw new HttpException(
            `${e.meta?.target[0]} Already Exists`,
            HttpStatus.CONFLICT,
          );
        }
      }
      console.log(e.message);
      throw new BaseExceptionFilter();
    }
  }

  async saveEducation(value: Application) {
    try {
      const res = await this.prismaService.application.update({
        data: { ...value, prevStep: 1, currStep: 2, nextStep: 3 },
        where: { email: value.email },
      });
      return {
        msg: 'Second Step Success',
        application: res,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Not Updated the Details');
    }
  }

  async saveInternship(value: Application) {
    try {
      const res = await this.prismaService.application.update({
        data: {
          ...value,
          prevStep: 2,
          currStep: 3,
          nextStep: 4,
          status: 'DONE',
        },
        where: { email: value.email },
      });
      return {
        msg: 'Third Step Success',
        application: res,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Not Updated the Details');
    }
  }
}
