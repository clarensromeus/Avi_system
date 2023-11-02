import { PickType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PickType(CreateStudentDto, [
  'Ammount',
] as const) {
  CustomerId: string;
}
