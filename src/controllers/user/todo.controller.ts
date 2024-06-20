import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DataResponse } from '../../utility/dataResponse';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from '../../guards/auth.guard';
import { VerifiesGuard } from '../../guards/verify.guard';
import { Verifies } from '../../decorators/verify.decorator';
import { VerifyEnum } from '../../enums/verify.enum';
import { TodoService } from '../../services/todo.service';
import { TodoUserService } from '../../services/todo_user.service';
import { NotificationService } from '../../services/notification.service';
import { Sequelize } from 'sequelize-typescript';
@UseGuards(AuthGuard, VerifiesGuard)
@Verifies(VerifyEnum.True)
@Controller('todos')
export class TodoController {
  constructor(
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly todoService: TodoService,
    private readonly todoUserService: TodoUserService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTodoOfUser(
    @Request() request: ExpressRequest,
    @Body() data: any,
  ) {
    const transaction = await this.sequelize.transaction();
    try {
      const userId = parseInt(request.user.id, 10);
      const todo = await this.todoService.createTodoOfUser({
        data,
        transaction,
      });
      const notification =
        await this.notificationService.createNotificationUser({
          data: {
            userId,
            todoId: todo.id,
          },
          transaction,
        });
      const todoUser = await this.todoUserService.createTodoUser({
        data: {
          userId,
          todoId: todo.id,
        },
        transaction,
      });
      await transaction.commit();
      return new DataResponse(
        { todo, notification, todoUser },
        'Success',
        HttpStatus.OK,
      );
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(
        'Error creating todo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
