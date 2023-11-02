// external imports of resources
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// internally crafted imports of resources
import { Admin } from './entities/admin.entity';
import { Student } from './entities/student.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_TOKEN } from 'src/constants';
import { AuthGuard } from 'src/guards/auth.guards';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Student]),
    JwtModule.register({
      global: true,
      secret: SECRET_TOKEN,
      signOptions: { expiresIn: '66d' }, // expires in two month
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: 'APP_GUARD', useClass: AuthGuard }],
  exports: [AuthService, TypeOrmModule],
})
export class AuthModule {}
