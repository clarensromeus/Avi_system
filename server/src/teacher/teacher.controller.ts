import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ForbiddenException,
  Inject,
  ParseUUIDPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageServer } from 'src/services/Image.service';
import { IMAGE_TOKEN } from 'src/constants';
import { Public } from 'src/metatata/auth.metadata';
import { Roles } from 'src/metatata/role.medata';

@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    @Inject(IMAGE_TOKEN) private imageserver: ImageServer,
  ) {}

  @Post()
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  @Public()
  async findAllTeachers() {
    try {
      return this.teacherService.findAllTeachers();
    } catch (error) {
      throw new ForbiddenException('Forbidden', { cause: error });
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: number) {
    return this.teacherService.findOne(id);
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
  async updateTeacher(
    @Param('id', ParseUUIDPipe) id: number,
    @UploadedFile(
      'file',
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 3000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      return await this.teacherService.updateTeacher(
        id,
        this.imageserver.getSeverimage(file.filename),
      );
    } catch (error) {
      throw new ForbiddenException('fobidden', { cause: error });
    }
  }

  @Roles('Admin')
  @Delete('delete/:id')
  async RemoveTeacher(@Param('id', ParseUUIDPipe) id: number) {
    try {
      return this.teacherService.EditTeacher(id);
    } catch (error) {
      throw new ForbiddenException('fobiddern', { cause: error });
    }
  }
}
