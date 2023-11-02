import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @IsOptional()
  @IsUUID()
  id;

  @IsString()
  CourseName: string;

  @IsString()
  CourseIcon: string;

  @IsString()
  Daysperweek: string;

  @IsString()
  HoursPerDay: string;
}
