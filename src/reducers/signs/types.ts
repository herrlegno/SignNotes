import { Moment } from 'moment';
import { Signature } from '@app/config/db';

export const SIGN_IN = 'SIGN/SIGN_IN/SUCCESS';
export const SIGN_OUT = 'SIGN/SIGN_OUT/SUCCESS';
export const SIGN_INITIALIZATION = 'SIGN/INITIALIZATION';
export const SIGN_UPDATE = 'SIGN/SIGN_UPDATE';
export const SIGN_ERROR = 'SIGN/ERROR';
export const SIGN_IN_REQUEST = 'SIGN/SIGN_IN/REQUEST';
export const SIGN_OUT_REQUEST = 'SIGN/SIGN_OUT/REQUEST';

export interface SignPayload {
  date: Moment;
}

export interface SignUpdatePayload {
  date: Moment;
  in?: Moment;
  out?: Moment;
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

export type SignActionType =
  | SignInAction
  | SignOutAction
  | SignInitializationAction
  | SignUpdateAction
  | SignErrorAction
  | SignRequestAction;
