import { Admin } from 'src/auth/entities/admin.entity';
import { NotiTypeEnum } from 'src/enum/notifications.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'enum', enum: NotiTypeEnum, default: NotiTypeEnum.NONE })
  NotiType: NotiTypeEnum;

  @Column({ type: 'varchar', length: 200 })
  PerformerFirstname: string;

  @Column({ type: 'varchar', length: 200 })
  PerformerLastname: string;

  @CreateDateColumn({})
  createdAt: Date;

  @OneToOne(() => Admin)
  @JoinColumn()
  NotiSender: Admin;
}
