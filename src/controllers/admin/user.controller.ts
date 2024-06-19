import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DataResponse } from '../../utility/dataResponse';
import { AuthGuard } from '../../guards/auth.guard';
import { UserService } from '../../services/user.service';
import { RolesGuard } from '../../guards/role.guard';
import { Roles } from '../../decorators/auth.decorator';
import { RoleEnum } from '../../enums/role.enum';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('userId') userId: string) {
    try {
      const data = await this.userService.deleteUser(userId);
      return new DataResponse(data, 'Success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        'Error deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('userId') userId: string) {
    try {
      const data = await this.userService.getUser(userId);
      return new DataResponse(data, 'Success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        'Error getting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    try {
      const data = await this.userService.getUsers();
      return new DataResponse(data, 'Success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        'Error getting users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('userId') userId: string, @Body() data: any) {
    try {
      const user = await this.userService.updateUser(userId, data);
      return new DataResponse(user, 'Success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        'Error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
