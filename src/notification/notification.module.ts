import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';
import { notificationsProviders } from './notification.provider';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, ...notificationsProviders],
})
export class NotificationModule {}
