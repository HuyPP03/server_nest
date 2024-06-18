import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { DataResponse } from '../../utility/dataResponse';
import { Request as ExpressRequest } from 'express';
import { RolesGuard } from '../../guards/role.guard';
import { AuthGuard } from '../../guards/auth.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() request: ExpressRequest) {
    const user = await this.userService.getProfile(request.user.id);
    return new DataResponse(user, 'Success', HttpStatus.OK);
  }

  @Put('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Body() data: any, @Request() request: ExpressRequest) {
    const user = await this.userService.updateProfile(request.user.id, data);
    return new DataResponse(user, 'Success', HttpStatus.OK);
  }
}
