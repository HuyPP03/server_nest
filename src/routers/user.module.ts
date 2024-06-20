import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from '../controllers//user/user.controller';
import { UserService } from '../services/user.service';
import { usersProviders } from '../providers/user.provider';
import { TodoController } from '../controllers/user/todo.controller';
import { TodoService } from '../services/todo.service';
import { todosProviders } from '../providers/todo.provider';
import { TodoUserService } from '../services/todo_user.service';
import { todoUsersProviders } from '../providers/todo_user.provider';
import { NotificationService } from '../services/notification.service';
import { notificationsProviders } from '../providers/notification.provider';
import { DatabaseModule } from '../database/database.module';
import { TodoUserController } from '../controllers/user/todo_user.controller';
import { NotificationController } from '../controllers/user/notification.controller';

@Module({
  imports: [
    DatabaseModule,
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
  controllers: [
    UserController,
    TodoController,
    TodoUserController,
    NotificationController,
  ],
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
export class UserModule {}
