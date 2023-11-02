import { PickType } from '@nestjs/mapped-types';
import { adminDto } from './admin.dto';

export class studentAdminSignInDto extends PickType(adminDto, [
  'Email',
  'Password',
  'IsRole',
]) {}
