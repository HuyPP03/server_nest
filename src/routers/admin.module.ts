import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from '../controllers/admin/user.controller';
import { usersProviders } from '../providers/user.provider';
import { UserService } from '../services/user.service';
import { TodoController } from '../controllers/admin/todo.controller';
import { TodoService } from '../services/todo.service';
import { todosProviders } from '../providers/todo.provider';
import { TodoUserService } from '../services/todo_user.service';
import { todoUsersProviders } from '../providers/todo_user.provider';
import { NotificationService } from '../services/notification.service';
import { notificationsProviders } from '../providers/notification.provider';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.jwtSecret'),
        signOptions: {
          expiresIn: configService.get<string>('app.jwtExpiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController, TodoController],
  providers: [
    UserService,
    ...usersProviders,
    TodoService,
    ...todosProviders,
    TodoUserService,
    ...todoUsersProviders,
    NotificationService,
    ...notificationsProviders,
  ],
})
export class AdminModule {}
