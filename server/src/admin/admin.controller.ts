import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UploadedFile,
  UseInterceptors,
  ParseUUIDPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { IMAGE_TOKEN } from 'src/constants';
import { ImageServer } from 'src/services/Image.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from 'src/metatata/auth.metadata';
import { Roles } from 'src/metatata/role.medata';

@Controller('administrator')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    @Inject(IMAGE_TOKEN) private imageServer: ImageServer,
  ) {}

  @Public()
  @Get()
  async findAllAdmin() {
    return this.adminService.findAllAdmin();
  }

  @Get(':id')
  async fineOneAdmin(@Param('id', ParseUUIDPipe) id: number) {
    return this.adminService.findOneAdmin(id);
  }

  @Roles('Admin')
  @Post('/create')
  async CreateAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Roles('Admin')
  @Patch('/edit/:id')
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
  async EditAdmin(
    @Param('id', ParseUUIDPipe) id: number,
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
    return this.adminService.updateAdmin(
      id,
      this.imageServer.getSeverimage(file.filename),
    );
  }

  @Roles('Admin')
  @Delete('/delete/:id')
  async DeleteAdmin(@Param('id', ParseUUIDPipe) id: number) {
    return this.adminService.removeAdmin(id);
  }
}
