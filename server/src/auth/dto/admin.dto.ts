import {
  IsEmail,
  MaxLength,
  MinLength,
  Matches,
  IsString,
  IsOptional,
  IsEnum,
  IsUrl,
  IsNumberString,
} from 'class-validator';
import { RoleEnum } from 'src/enum/index.enum';

export class adminDto {
  @IsNumberString()
  @IsOptional()
  id: number;

  @IsString()
  Firstname: string;

  @IsString()
  Lastname: string;

  @Matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  )
  @MaxLength(50, { message: 'password is too long' })
  @MinLength(8, { message: 'password is too short' })
  Password: any;

  @IsEmail()
  Email: string;

  @IsOptional()
  @IsEnum(RoleEnum)
  Role: RoleEnum;

  @IsString()
  IsRole: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  Avatar?: string;
}
