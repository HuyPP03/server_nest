import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { todosProviders } from './todo.provider';

@Module({
  controllers: [TodoController],
  providers: [TodoService, ...todosProviders],
})
export class TodoModule {}
