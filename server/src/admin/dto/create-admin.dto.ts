import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoleEnum } from 'src/enum/index.enum';

export class CreateAdminDto {
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
}
