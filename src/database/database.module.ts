import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { Sequelize } from 'sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule implements OnModuleInit {
  constructor(@Inject('SEQUELIZE') private sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
