import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/guards/role.guards';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), AuthModule],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    { provide: 'APP_GUARD', useClass: RolesGuard },
  ],
})
export class NotificationsModule {}
