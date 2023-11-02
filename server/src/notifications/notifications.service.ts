import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/auth/entities/admin.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepositry: Repository<Notification>,
    @InjectRepository(Admin) private adminRepositry: Repository<Admin>,
  ) {}

  async createNotification(createNotificationDto: CreateNotificationDto) {
    try {
      const notisender = this.adminRepositry.findOneBy({
        id: createNotificationDto.NotisenderId,
      });

      const notification = await this.notificationRepositry.create({
        NotiType: createNotificationDto.NotiType,
        PerformerFirstname: createNotificationDto.PerformerFirstname,
        PerformerLastname: createNotificationDto.PerformerLastname,
      });
      notification.NotiSender = await notisender;

      const notificationCreation =
        await this.notificationRepositry.save(notification);

      if (!notificationCreation) {
        return {
          message: 'notification is not sent',
          success: false,
        };
      }

      return {
        message: 'notification is created',
        success: true,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllNotification() {
    try {
      return await this.notificationRepositry.find({
        relations: {
          NotiSender: true,
        },
        select: {
          id: true,
          PerformerLastname: true,
          PerformerFirstname: true,
          NotiType: true,
          createdAt: true,
          NotiSender: {
            id: true,
            Firstname: true,
            Lastname: true,
            Avatar: true,
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeNotification(id: number) {
    try {
      return await this.notificationRepositry.delete({ id });
    } catch (error) {
      throw new BadRequestException('BAD REQUEST', { cause: error });
    }
  }
}
