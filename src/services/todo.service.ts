import { Inject, Injectable } from '@nestjs/common';
import { Todo } from '../database/models/todo.model';
import { Transaction } from 'sequelize';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODOS_REPOSITORY')
    private todoRepository: typeof Todo,
  ) {}
  async createTodoOfUser({
    data,
    transaction,
  }: {
    data: any;
    transaction: Transaction;
  }): Promise<Todo> {
    const todo = await this.todoRepository.create(data, { transaction });
    return todo;
  }
}
