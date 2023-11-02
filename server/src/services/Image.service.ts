import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageServer {
  constructor(private configService: ConfigService) {}

  getSeverimage(image: string) {
    const serverurl = `http://${this.configService.get<string>(
      'SERVER_URL',
    )}/${image}`;

    return serverurl;
  }
}
