import { Moment } from 'moment';
import { Signature } from '@app/config/db';

export const SIGN_IN = 'SIGN/SIGN_IN';
export const SIGN_OUT = 'SIGN/SIGN_OUT';
export const SIGN_INITIALIZATION = 'SIGN/INITIALIZATION';

export interface SignPayload {
  date: Moment;
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

export type SignActionType =
  | SignInAction
  | SignOutAction
  | SignInitializationAction;
