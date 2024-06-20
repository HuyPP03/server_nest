import { Inject, Injectable } from '@nestjs/common';
import { TodoUser } from '../database/models/todo_user.model';
import { Transaction } from 'sequelize';
import { Todo } from '../database/models/todo.model';

@Injectable()
export class TodoUserService {
  constructor(
    @Inject('TODO_USERS_REPOSITORY')
    private todoUserRepository: typeof TodoUser,
  ) {}
  async createTodoUser({
    data,
    transaction,
  }: {
    data: {
      userId: number;
      todoId: number;
    };
    transaction: Transaction;
  }): Promise<TodoUser> {
    return this.todoUserRepository.create(
      {
        userId: data.userId,
        todoId: data.todoId,
      },
      { transaction },
    );
  }

  async getTodosUser(userId: number): Promise<TodoUser[]> {
    return await this.todoUserRepository.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Todo,
        },
      ],
    });
  }
}
