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
import { RolesGuard } from '../../guards/role.guard';
import { Roles } from '../../decorators/auth.decorator';
import { RoleEnum } from '../../enums/role.enum';
import { VerifiesGuard } from '../../guards/verify.guard';
import { Verifies } from '../../decorators/verify.decorator';
import { VerifyEnum } from '../../enums/verify.enum';
import { TodoService } from '../../services/todo.service';
import { TodoUserService } from '../../services/todo_user.service';
import { NotificationService } from '../../services/notification.service';

@UseGuards(AuthGuard, RolesGuard, VerifiesGuard)
@Verifies(VerifyEnum.True)
@Roles(RoleEnum.Admin)
@Controller('todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly todoUserService: TodoUserService,
    private readonly notificationService: NotificationService,
  ) {}
}
