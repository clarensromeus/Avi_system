// extenal imports of resources
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

// internally crafted imports of resources
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import Configuration from './config /Configuration';
import { DatabaseModule } from './database/database.module';
import { AlsModule } from './als/als.module';
import { AlsMiddleware } from './als/als.middleware';
import { TeacherModule } from './teacher/teacher.module';
import { StripeModule } from './Stripe/stripe.module';
import { STRIPE_SECRETE_KEY } from './constants';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    AdminModule,
    StudentModule,
    AuthModule,
    CourseModule,
    AlsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true, // for faster load reason
      load: [Configuration],
    }),
    DatabaseModule,
    TeacherModule,
    StripeModule.forRoot(STRIPE_SECRETE_KEY, {
      apiVersion: '2023-10-16',
      stripeAccount: process.env.STRIPE_ACCOUNT_ID,
    }),
    NotificationsModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlsMiddleware).forRoutes('*');
  }
}
