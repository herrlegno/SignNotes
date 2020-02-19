import {
  ADD,
  REMOVE,
  NotificationActionType,
  Notification,
} from './types';
import moment from '@app/config/moment';

const notificationsReducer = (
  state: Notification[] = [],
  action: NotificationActionType,
) => {
  switch (action.type) {
    case ADD: {
      const id = moment().valueOf();

      const notification = { id, ...action.payload };
      return [...state, notification];
    }

    case REMOVE: {
      return state.filter(
        notification => notification.id !== action.payload.id,
      );
    }

    default: {
      return state;
    }
  }
};

export default notificationsReducer;
