import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Public } from 'src/metatata/auth.metadata';
import { Roles } from 'src/metatata/role.medata';

@Controller('notification')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Roles('Admin')
  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @Public()
  @Get()
  async findAllNotifications() {
    return this.notificationsService.findAllNotification();
  }

  @Roles('Admin')
  @Delete('delete/:id')
  async removeNotification(@Param('id', ParseUUIDPipe) id: number) {
    return this.notificationsService.removeNotification(id);
  }
}
