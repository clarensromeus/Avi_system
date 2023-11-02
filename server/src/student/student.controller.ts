import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  Inject,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { IMAGE_TOKEN, STRIPE_SECRETE_KEY } from 'src/constants';
import { ImageServer } from 'src/services/Image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import Stripe from 'stripe';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Public } from 'src/metatata/auth.metadata';
import { Roles } from 'src/metatata/role.medata';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    @Inject(IMAGE_TOKEN) private imageServer: ImageServer,
    @Inject(STRIPE_SECRETE_KEY) private stripe: Stripe,
  ) {}

  @Public()
  @Get()
  async findAllStudent() {
    try {
      return this.studentService.findAllStudent();
    } catch (error) {
      throw new ForbiddenException('forbidden', { cause: error });
    }
  }

  @Roles('Admin')
  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    try {
      return await this.studentService.createStudent(createStudentDto);
    } catch (error) {
      throw new ForbiddenException('Forbidden', { cause: error });
    }
  }

  @Get(':id')
  async findOneStudent(@Param('id', ParseUUIDPipe) id: number) {
    try {
      return this.studentService.findOneStudent(id);
    } catch (error) {
      throw new ForbiddenException('Forbidden', { cause: error });
    }
  }

  @Roles('Admin')
  @Patch('edit/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  EditStudent(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @UploadedFile(
      'file',
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 2000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      return this.studentService.updateStudent(
        id,
        this.imageServer.getSeverimage(file.filename),
      );
    } catch (error) {
      new ForbiddenException('forbidden', { cause: error });
    }
  }

  @Roles('Admin')
  @Delete('delete/:id')
  DeleteStudent(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    try {
      return this.studentService.deleteStudent(id);
    } catch (error) {
      throw new ForbiddenException('forbidden', { cause: error });
    }
  }

  @Patch('payment/:id')
  async Payment(
    @Param(':id', ParseUUIDPipe) id: number,
    @Body() updateData: UpdateStudentDto,
  ) {
    try {
      return this.studentService.createPayment(
        id,
        updateData.Ammount,
        updateData.CustomerId,
      );
    } catch (error) {
      throw new HttpException('payment error', HttpStatus.BAD_GATEWAY);
    }
  }
}
