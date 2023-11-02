import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { IMAGE_TOKEN } from 'src/constants';
import { ImageServer } from 'src/services/Image.service';
import { RolesGuard } from 'src/guards/role.guards';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    { provide: IMAGE_TOKEN, useClass: ImageServer },
    { provide: 'APP_GUARD', useClass: RolesGuard },
  ],
})
export class AdminModule {}
