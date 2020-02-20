import { SET_OPTIONS, OptionsActionType, Options } from './types';
import { Dispatch } from 'redux';
import { pushNotification } from '@app/reducers/notifications/actions';
import { AddActionPayload } from '@app/reducers/notifications/types';

function set(data: Options): OptionsActionType {
  return {
    type: SET_OPTIONS,
    payload: data,
  };
}

//Redux-thunk
export function setOptions(data: Options) {
  return (dispatch: Dispatch) => {
    dispatch(set(data));

    const notification: AddActionPayload = {
      type: 'success',
      message: 'Opciones actualizadas correctamente.',
    };
    return dispatch(pushNotification(notification));
  };
}
