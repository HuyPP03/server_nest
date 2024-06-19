import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DataResponse } from '../../utility/dataResponse';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from '../../guards/auth.guard';
import { UserService } from '../../services/user.service';
@UseGuards(AuthGuard)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() request: ExpressRequest) {
    try {
      const user = await this.userService.getProfile(request.user.id);
      return new DataResponse(user, 'Success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        'Error getting profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Body() data: any, @Request() request: ExpressRequest) {
    try {
      const user = await this.userService.updateProfile(request.user.id, data);
      return new DataResponse(user, 'Success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        'Error updating profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
