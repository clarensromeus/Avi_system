// external imports of resources
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  Firstname: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  Lastname: string;

  @Column({ type: 'varchar', primary: true })
  Password: any;

  @Column({ type: 'varchar', length: 100 })
  Class: string;

  @Column({ type: 'int', nullable: true })
  Ammount?: number;

  @Column({ type: 'varchar', nullable: false })
  IsRole: string;

  @Column({ type: 'varchar', length: 200, nullable: false, primary: true })
  Email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  DOB: string;

  @Column({ type: 'varchar', nullable: true })
  Avatar?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
