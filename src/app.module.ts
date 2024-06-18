import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import envConfig from './env';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { TodoUserModule } from './todo_user/todo_user.module';
import { NotificationModule } from './notification/notification.module';
import { RouterModule } from '@nestjs/core';
import { FileUploadInterceptor } from './utility/uploadFile.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    TodoModule,
    TodoUserModule,
    NotificationModule,
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
        children: [
          { path: 'auth', module: AuthModule },
          { path: 'user', module: UserModule },
          { path: 'todo', module: TodoModule },
          { path: 'todo-user', module: TodoUserModule },
          { path: 'notification', module: NotificationModule },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, FileUploadInterceptor],
})
export class AppModule {}
