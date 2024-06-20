import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DataResponse } from '../../utility/dataResponse';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from '../../guards/auth.guard';
import { VerifiesGuard } from '../../guards/verify.guard';
import { Verifies } from '../../decorators/verify.decorator';
import { VerifyEnum } from '../../enums/verify.enum';
import { NotificationService } from '../../services/notification.service';
@UseGuards(AuthGuard, VerifiesGuard)
@Verifies(VerifyEnum.True)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getNotifications(@Request() request: ExpressRequest) {
    try {
      const userId = parseInt(request.user.id, 10);
      const data = await this.notificationService.getNotifications(userId);
      return new DataResponse(data, 'Success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        'Error getting todos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
