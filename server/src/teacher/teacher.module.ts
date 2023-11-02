import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { ImageServer } from 'src/services/Image.service';
import { IMAGE_TOKEN } from 'src/constants';
import { RolesGuard } from 'src/guards/role.guards';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [
    TeacherService,
    { provide: IMAGE_TOKEN, useClass: ImageServer },
    { provide: 'APP_GUARD', useClass: RolesGuard },
  ],
})
export class TeacherModule {}
