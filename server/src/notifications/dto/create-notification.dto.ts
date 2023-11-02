import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { NotiTypeEnum } from 'src/enum/notifications.enum';

export class CreateNotificationDto {
  @IsNumberString()
  @IsOptional()
  id?: number;

  @IsEnum(NotiTypeEnum)
  NotiType: NotiTypeEnum;

  @IsString()
  PerformerFirstname: string;

  @IsString()
  PerformerLastname: string;

  @IsUUID()
  NotisenderId: number;
}
