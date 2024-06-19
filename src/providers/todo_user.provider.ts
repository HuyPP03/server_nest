import { TodoUser } from '../database/models/todo_user.model';

export const todoUsersProviders = [
  {
    provide: 'TODO_USERS_REPOSITORY',
    useValue: TodoUser,
  },
];
