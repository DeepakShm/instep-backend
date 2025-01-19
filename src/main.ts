import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const message = errors.map((error) => {
          console.log(error);
          for (const property in error.constraints) {
            return {
              message: error.constraints[property],
              property: error.property,
              value: error.value,
            };
          }
        });
        return new BadRequestException(message);
      },
    }),
  );
  app.enableCors();
  await app.listen(3010);
}
bootstrap();
