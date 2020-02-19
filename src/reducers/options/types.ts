export const SET_OPTIONS = 'OPTIONS/SET';

export interface Options {
  weeklyHours: string;
}

interface SetAction {
  type: typeof SET_OPTIONS;
  payload: Options;
}

export type OptionsActionType = SetAction;
