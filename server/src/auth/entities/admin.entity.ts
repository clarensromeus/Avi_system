// external imports of resources
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

// internally crafted imports of resources
import { RoleEnum } from 'src/enum/index.enum';

@Entity({ name: 'administrators' })
export class Admin {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  Firstname: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  Lastname: string;

  @Column({ type: 'varchar', primary: true })
  Password: any;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.SIMPLE })
  Role: RoleEnum;

  @Column({ type: 'varchar', length: 100 })
  IsRole: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  Email: string;

  @Column({ type: 'varchar', nullable: true })
  Avatar?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
