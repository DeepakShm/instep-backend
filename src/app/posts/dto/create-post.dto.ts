import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  MinLength,
  Validate,
} from 'class-validator';

export class CreatePostDto {
  @IsEmail({}, { message: 'Email Invalid' })
  @IsString({ message: 'First Name should be string' })
  @IsNotEmpty({ message: 'First Name required' })
  name: string;

  @MinLength(5)
  @IsNumber()
  @IsNotEmpty({ message: 'Age required' })
  number: string;
}
