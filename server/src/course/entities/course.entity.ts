import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: '200' })
  CourseName: string;

  @Column({ type: 'varchar', length: '200' })
  CourseIcon: string;

  @Column({ type: 'varchar', length: '200' })
  DaysPerWeek: string;

  @Column({ type: 'varchar', length: '200' })
  HoursPerDay: string;
}
