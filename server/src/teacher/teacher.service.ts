import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepositry: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const Teacher = await this.teacherRepositry.create(createTeacherDto);
      this.teacherRepositry.save(Teacher);

      if (!Teacher) {
        return {
          message: 'no teacher is created',
          success: false,
        };
      }

      return {
        message: 'teacher is successfully created',
        success: true,
      };
    } catch (error) {
      throw new BadRequestException('Bad Request ', { cause: error });
    }
  }

  async findAllTeachers() {
    return await this.teacherRepositry.find();
  }

  async findOne(id: number) {
    this.teacherRepositry.findOneBy({ id: id });
  }

  async updateTeacher(id: number, Avatar: string) {
    const teacher = await this.teacherRepositry.findOneBy({ id: id });
    teacher.Avatar = Avatar;

    await this.teacherRepositry.save(teacher);

    if (!teacher) {
      return {
        message: 'user is not updated',
        success: false,
      };
    }

    return {
      message: 'user is successfully updated',
      success: true,
    };
  }

  async EditTeacher(id: number) {
    const teacher = await this.teacherRepositry.delete({ id });
    if (!teacher) {
      return {
        message: 'user is not deleted',
        success: false,
      };
    }

    return {
      message: 'user is successfully deleted',
      success: true,
    };
  }
}
