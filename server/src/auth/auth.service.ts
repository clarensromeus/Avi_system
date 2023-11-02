// external imports of resources
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

// internally crafted imports of resources
import { ConfigService } from '@nestjs/config';
import { adminDto } from './dto/admin.dto';
import { Admin } from './entities/admin.entity';
import { Student } from './entities/student.entity';
import { studentDto } from './dto/student.dto';
import { studentAdminSignInDto } from './dto/studentAdminSignIn.dto';
import { AdMIN } from '../constants/index';
import { ISignIn, ISignUp } from '../typing/global';
import { studentAdminSignUpDto } from './dto/studentAdminSignUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Student) private studentRepositry: Repository<Student>,
    private jwtService: JwtService,
  ) {}

  async SignUp(Data: adminDto | studentDto): Promise<ISignUp> {
    try {
      if (Data.IsRole === AdMIN) {
        const { Firstname, Lastname, Password, IsRole, Email, Role, Avatar } =
          (await Data) as adminDto;

        const isAdminExist = this.adminRepository.findOneBy({ Email });

        if (isAdminExist) {
          return {
            message: 'sorry, this Administrator already exists',
            success: false,
          };
        }

        const passwordHashing: string = await argon2.hash(Password);

        const addAdmin = await this.adminRepository.create({
          Firstname,
          Lastname,
          Password: passwordHashing,
          IsRole,
          Email,
          Role,
          Avatar,
        });

        const savedAdmin = await this.adminRepository.save(addAdmin);

        if (!savedAdmin) {
          throw new ForbiddenException();
        }

        const payload = { sub: savedAdmin.id, Data: savedAdmin };
        const token: string = await this.jwtService.signAsync(payload);

        return {
          access_token: token,
          message: 'successfully registered',
          success: true,
        };
      }

      const {
        Password,
        Firstname,
        Lastname,
        Email,
        IsRole,
        Class,
        Avatar,
        DOB,
        Ammount,
      } = (await Data) as studentDto;

      const isStudentExist = this.studentRepositry.findOneBy({ Email });
      if (isStudentExist) {
        return {
          message: 'sorry this student already exists',
          success: false,
        };
      }

      const passwordHashing: string = await argon2.hash(Password);

      const addStudent = await this.studentRepositry.create({
        Firstname,
        Lastname,
        Password: passwordHashing,
        IsRole,
        Class,
        DOB,
        Email,
        Ammount,
        Avatar,
      });

      await this.studentRepositry.save(addStudent);

      if (!addStudent) {
        throw new ForbiddenException();
      }

      const payload = { sub: addStudent.id, Data: addStudent };
      const token: string = await this.jwtService.signAsync(payload);

      return {
        access_token: token,
        message: 'successfuly registered',
        success: true,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async SignIn(Data: studentAdminSignInDto): Promise<ISignIn> {
    try {
      const { Password, Email, IsRole } = await Data;

      if (IsRole == AdMIN) {
        const admin = await this.adminRepository.findOneBy({ Email });

        if (!admin) {
          return {
            message: 'email or password is wrong',
            success: false,
          };
        }

        const isPassword = await argon2.verify(admin.Password, Password);

        if (!isPassword) {
          return {
            message: 'email or password is wrong',
            success: false,
          };
        }

        const payload = { sub: admin.id, Data: admin };

        const token: string = await this.jwtService.signAsync(payload);

        return {
          message: 'sucessfully loggedIn',
          success: true,
          access_token: token,
        };
      }

      const student = await this.studentRepositry.findOneBy({ Email });

      if (!student) {
        return {
          message: 'password or email is wrong',
          success: false,
        };
      }

      const isStudentPassword = await argon2.verify(student.Email, Email);

      if (!isStudentPassword) {
        return {
          message: 'password or email is wrong',
          success: false,
        };
      }

      const payload = { sub: student.id, Data: student };

      const token: string = await this.jwtService.signAsync(payload);

      return {
        message: 'successfully authenticated',
        success: true,
        access_token: token,
      };
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'field validation error' },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  async GetProfile(IsRole: string, id: number) {
    try {
      if (IsRole === 'Admin') {
        return await this.adminRepository.findOneBy({ id });
      }

      return await this.studentRepositry.findOneBy({ id });
    } catch (error) {
      throw new UnauthorizedException('unAuthorized', { cause: error });
    }
  }
}
