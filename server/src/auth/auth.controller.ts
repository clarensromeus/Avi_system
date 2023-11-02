import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { adminDto } from './dto/admin.dto';
import { studentDto } from './dto/student.dto';
import { ISignIn, ISignUp } from '../typing/global';
import { Public } from 'src/metatata/auth.metadata';
import { User } from 'src/services/User.service';
import { studentAdminSignInDto } from './dto/studentAdminSignIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async SignIn(@Body() Data: studentAdminSignInDto): Promise<ISignIn> {
    try {
      return this.authService.SignIn(Data);
    } catch (error) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: error,
      });
    }
  }

  @Public()
  @Post('signup')
  async SignUp(@Body() Data: adminDto | studentDto): Promise<ISignUp> {
    try {
      return await this.authService.SignUp(Data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('profile')
  async GetProfile(@User('Data') Data: { id: number; IsRole: string }) {
    return this.authService.GetProfile(Data.IsRole, Data.id);
  }
}
