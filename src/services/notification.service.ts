import { Inject, Injectable } from '@nestjs/common';
import { Notification } from '../database/models/notification.model';
import { Transaction } from 'sequelize';
import { Todo } from '../database/models/todo.model';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATIONS_REPOSITORY')
    private notificationRepository: typeof Notification,
  ) {}
  async createNotificationUser({
    data,
    transaction,
  }: {
    data: {
      userId: number;
      todoId: number;
    };
    transaction: Transaction;
  }): Promise<Notification> {
    return await this.notificationRepository.create(
      {
        userId: data.userId,
        todoId: data.todoId,
      },
      { transaction },
    );
  }

  async getNotifications(userId: number) {
    return await this.notificationRepository.findAll({
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
