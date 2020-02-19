import { StateNotification } from '@app/components/NotificationManager/index.d';
import { Notification } from '@app/reducers/notifications/types';

export interface NotificationProps {
  close: (id) => void;
  data: StateNotification;
}

export type NotificationType = Notification['type'];
