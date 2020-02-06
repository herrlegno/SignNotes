import { Moment } from 'moment';

export const SIGN_IN = 'SIGN/SIGN_IN';
export const SIGN_OUT = 'SIGN/SIGN_OUT';

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

export type SignActionType = SignInAction | SignOutAction;
