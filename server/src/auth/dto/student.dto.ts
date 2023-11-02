import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class studentDto {
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

  @IsString()
  Class: string;

  @IsOptional()
  @IsNumber()
  Ammount?: number;

  @IsString()
  DOB: string;

  @IsString()
  IsRole: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  Avatar?: string;
}
