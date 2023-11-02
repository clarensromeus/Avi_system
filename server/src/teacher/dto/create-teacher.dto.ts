import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateTeacherDto {
  @IsNumberString()
  @IsOptional()
  id: number;

  @IsString()
  Firstname: string;

  @IsString()
  Lastname: string;

  @IsEmail()
  Email: string;

  @IsNumber()
  @Type(() => Number)
  PhoneNumber: number;

  @IsString()
  Course: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  Avatar?: string;
}
