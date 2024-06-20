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
import { TodoUserService } from '../../services/todo_user.service';
@UseGuards(AuthGuard, VerifiesGuard)
@Verifies(VerifyEnum.True)
@Controller('todo-users')
export class TodoUserController {
  constructor(private readonly todoUserService: TodoUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTodosOfUser(@Request() request: ExpressRequest) {
    try {
      const userId = parseInt(request.user.id, 10);
      const data = await this.todoUserService.getTodosUser(userId);
      return new DataResponse(data, 'Success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        'Error getting todos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
