import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validateSchema } from '../stepForm.validation';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const verifiedValue = await validateSchema(value, 1);
    console.log(value);
    return verifiedValue;
  }
}
