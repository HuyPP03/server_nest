import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './env';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './routers/auth.module';
import { AdminModule } from './routers/admin.module';
import { UserModule } from './routers/user.module';
import { PublicModule } from './routers/public.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    DatabaseModule,
    AuthModule,
    AdminModule,
    UserModule,
    PublicModule,
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'admin',
            module: AdminModule,
          },
          {
            path: 'user',
            module: UserModule,
          },
          {
            path: 'public',
            module: PublicModule,
          },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
