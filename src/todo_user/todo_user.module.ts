import { Module } from '@nestjs/common';
import { TodoUserController } from './controllers/todo_user.controller';
import { TodoUserService } from './services/todo_user.service';
import { todoUsersProviders } from './todo_user.provider';

@Module({
  controllers: [TodoUserController],
  providers: [TodoUserService, ...todoUsersProviders],
})
export class TodoUserModule {}
