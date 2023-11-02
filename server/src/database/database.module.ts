import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

// internally crafted imports of resources
import { Admin } from '../auth/entities/admin.entity';
import { Student } from '../auth/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Course } from 'src/course/entities/course.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('database.username'),
        password: configService.getOrThrow('database.password'),
        database: configService.getOrThrow('database.dbname'),
        entities: [Admin, Student, Teacher, Course, Notification],
        autoLoadEntities: true, // we do not have to manually tell typeorm  which entity model to load
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
