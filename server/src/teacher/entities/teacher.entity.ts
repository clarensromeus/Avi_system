import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Teacher')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  Firstname: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  Lastname: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  Email: string;

  @Column({ type: 'int' })
  PhoneNumber: number;

  @Column({ type: 'varchar', length: 200 })
  Course: string;

  @Column({ type: 'varchar', nullable: true })
  Avatar?: string;
}
