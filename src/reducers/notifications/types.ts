export const ADD = 'NOTIFICATION/ADD';
export const REMOVE = 'NOTIFICATION/REMOVE';

export type Notification = AddActionPayload & {
  id: number;
};

export interface AddActionPayload {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export interface RemoveActionPayload {
  id: number;
}

interface AddAction {
  type: typeof ADD;
  payload: AddActionPayload;
}

interface RemoveAction {
  type: typeof REMOVE;
  payload: RemoveActionPayload;
}

export type NotificationActionType = AddAction | RemoveAction;
