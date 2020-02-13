import { Notification } from '@app/reducers/notifications/types';

export type StateNotification = Notification & {
  show: boolean;
};
