import { Moment } from 'moment';
import { Signature } from '@app/config/db';

export const SIGN_IN = 'SIGN/SIGN_IN/SUCCESS';
export const SIGN_OUT = 'SIGN/SIGN_OUT/SUCCESS';
export const SIGN_INITIALIZATION = 'SIGN/INITIALIZATION';
export const SIGN_UPDATE = 'SIGN/SIGN_UPDATE';
export const SIGN_ERROR = 'SIGN/ERROR';
export const SIGN_IN_REQUEST = 'SIGN/SIGN_IN/REQUEST';
export const SIGN_OUT_REQUEST = 'SIGN/SIGN_OUT/REQUEST';
export const SET_HOLIDAY = 'SIGN/SET_HOLIDAY/SUCCESS';
export const SET_HOLIDAY_REQUEST = 'SIGN/SET_HOLIDAY/REQUEST';
export const SET_HOLIDAY_ERROR = 'SIGN/SET_HOLIDAY/ERROR';

export interface SignPayload {
  date: Moment;
}

export interface SignUpdatePayload {
  date: Moment;
  in?: Moment;
  out?: Moment;
}

export interface SetHolidayPayload {
  date: Moment;
  holiday: boolean;
}

interface SignInAction {
  type: typeof SIGN_IN;
  payload: SignPayload;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
  payload: SignPayload;
}

interface SignInitializationAction {
  type: typeof SIGN_INITIALIZATION;
  payload: Signature[];
}

interface SignUpdateAction {
  type: typeof SIGN_UPDATE;
  payload: SignUpdatePayload;
}

interface SignRequestAction {
  type: typeof SIGN_IN_REQUEST | typeof SIGN_OUT_REQUEST;
}

interface SignErrorAction {
  type: typeof SIGN_ERROR;
}

interface SetHolidayAction {
  type: typeof SET_HOLIDAY;
  payload: SetHolidayPayload;
}

interface SetHolidayRequestAction {
  type: typeof SET_HOLIDAY_REQUEST;
}

interface SetHolidayErrorAction {
  type: typeof SET_HOLIDAY_ERROR;
}

export type SignActionType =
  | SignInAction
  | SignOutAction
  | SignInitializationAction
  | SignUpdateAction
  | SignErrorAction
  | SignRequestAction
  | SetHolidayAction
  | SetHolidayRequestAction
  | SetHolidayErrorAction;
