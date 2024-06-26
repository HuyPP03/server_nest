import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import { Todo } from './models/todo.model';
import { TodoUser } from './models/todo_user.model';
import { Notification } from './models/notification.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.get<string>('database.dialect') as any, // Type assertion vì Sequelize không nhận kiểu string
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
      });
      sequelize.addModels([User, Todo, TodoUser, Notification]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
