import { Notification } from '../database/models/notification.model';

export const notificationsProviders = [
  {
    provide: 'NOTIFICATIONS_REPOSITORY',
    useValue: Notification,
  },
];
