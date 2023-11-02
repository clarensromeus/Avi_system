import { IsEnum, IsOptional } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { studentDto } from './student.dto';
import { RoleEnum } from 'src/enum/index.enum';

export class studentAdminSignUpDto extends PickType(studentDto, [
  'Firstname',
  'id',
  'IsRole',
  'Lastname',
  'Password',
]) {
  @IsOptional()
  @IsEnum(RoleEnum)
  Role: RoleEnum;
}
