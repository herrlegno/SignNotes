import { SET_OPTIONS, OptionsActionType, Options } from './types';

export function setOptions(data: Options): OptionsActionType {
  return {
    type: SET_OPTIONS,
    payload: data,
  };
}
