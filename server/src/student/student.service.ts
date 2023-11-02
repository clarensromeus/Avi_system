import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/auth/entities/student.entity';
import { Repository } from 'typeorm';
import { STRIPE_SECRETE_KEY } from 'src/constants';
import Stripe from 'stripe';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @Inject(STRIPE_SECRETE_KEY) private readonly stripe: Stripe,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const student = await this.studentRepository.create(createStudentDto);
    await this.studentRepository.save(student);

    if (!student) {
      return {
        message: 'student is not created',
        success: false,
      };
    }

    return {
      message: 'student is created with success',
      success: true,
    };
  }

  async findAllStudent() {
    return await this.studentRepository.find();
  }

  async findOneStudent(id: number) {
    return await this.studentRepository.findOneBy({ id });
  }

  async updateStudent(id: number, Avatar: string) {
    const student = await this.studentRepository.findOneBy({ id });
    student.Avatar = Avatar;
    await this.studentRepository.save(student);

    if (!student) {
      return {
        message: 'student is not updated',
        success: false,
      };
    }

    return {
      message: 'student is success updated',
      success: true,
    };
  }

  async deleteStudent(id: number) {
    return await this.studentRepository.delete({ id });
  }

  async createPayment(id: number, Amount: number, customerId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Amount,
        currency: 'USD',
        customer: customerId,
      });

      paymentIntent.livemode = false;

      if (!paymentIntent) {
        return {
          message: 'no payment is made',
          success: false,
        };
      }

      const student = await this.studentRepository.findOneBy({ id });
      student.Ammount = paymentIntent.amount;
      this.studentRepository.save(student);
    } catch (error) {
      throw new HttpException('Payment Error', HttpStatus.BAD_GATEWAY);
    }
  }
}
