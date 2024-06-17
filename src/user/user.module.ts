import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { usersProviders } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './services/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...usersProviders, UserService],
})
export class UserModule {}
