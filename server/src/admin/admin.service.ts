import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/auth/entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private AdminRepositry: Repository<Admin>,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    try {
      const admin = await this.AdminRepositry.create(createAdminDto);
      await this.AdminRepositry.save(admin);

      if (!admin) {
        return {
          message: 'admin is not created with success',
          success: false,
        };
      }

      return {
        message: 'administrator is successfully created',
        success: true,
      };
    } catch (error) {
      throw new ForbiddenException('Forbidden', { cause: error });
    }
  }

  async findAllAdmin() {
    try {
      return await this.AdminRepositry.find();
    } catch (error) {
      throw new ForbiddenException('Forbidden', { cause: error });
    }
  }

  async findOneAdmin(id: number) {
    try {
      return await this.AdminRepositry.findOneBy({ id });
    } catch (error) {
      try {
      } catch (error) {
        throw new ForbiddenException('Forbidden', { cause: error });
      }
    }
  }

  async updateAdmin(id: number, Avatar: string) {
    try {
      const admin = await this.AdminRepositry.findOneBy({ id });
      admin.Avatar = Avatar;
      this.AdminRepositry.save(admin);
      return {
        message: 'admin is successfylly updated',
        success: true,
      };
    } catch (error) {
      throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async removeAdmin(id: number) {
    try {
      return await this.AdminRepositry.delete({ id });
    } catch (error) {
      throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
