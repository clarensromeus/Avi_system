import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseRepository.create(createCourseDto);
      await this.courseRepository.save(course);

      if (!course) {
        return {
          mesage: 'course is not created ',
          success: false,
        };
      }

      return {
        message: 'course is created with success',
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAllCourse() {
    try {
      return await this.courseRepository.find();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateCourse(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.courseRepository.findOneBy({ id });
      course.CourseIcon = updateCourseDto.CourseIcon;
      course.CourseName = updateCourseDto.CourseName;
      course.DaysPerWeek = updateCourseDto.Daysperweek;
      course.HoursPerDay = updateCourseDto.HoursPerDay;

      await this.courseRepository.save(course);

      if (!course) {
        return {
          messae: 'course is not updated',
          success: false,
        };
      }

      return {
        mesage: 'course is successfully updated',
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async removeCourse(id: number) {
    try {
      const course = await this.courseRepository.delete({ id });
      if (!course) {
        return {
          message: 'course is not deleted',
          success: false,
        };
      }

      return {
        message: 'course is successfully deleted',
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
