import {
  ADD,
  REMOVE,
  NotificationActionType,
  AddActionPayload,
  RemoveActionPayload,
} from './types';

export function pushNotification(
  data: AddActionPayload,
): NotificationActionType {
  return {
    type: ADD,
    payload: data,
  };
}

export function removeNotification(
  id: RemoveActionPayload['id'],
): NotificationActionType {
  return {
    type: REMOVE,
    payload: { id },
  };
}
