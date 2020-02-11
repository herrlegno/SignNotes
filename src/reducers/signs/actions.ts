import {
  SignPayload,
  SignActionType,
  SIGN_IN,
  SIGN_OUT,
  SIGN_INITIALIZATION,
  SignUpdatePayload,
  SIGN_UPDATE,
} from './types';
import db, { Signature } from '@app/config/db';
import { Dispatch } from 'redux';

export function signIn(signature: SignPayload): SignActionType {
  return {
    type: SIGN_IN,
    payload: signature,
  };
}

export function signOut(signature: SignPayload): SignActionType {
  return {
    type: SIGN_OUT,
    payload: signature,
  };
}

export function signInitialization(
  signatures: Signature[],
): SignActionType {
  return {
    type: SIGN_INITIALIZATION,
    payload: signatures,
  };
}

// TODO: This need to be typed
export function getSignatures() {
  // Retornamos una función para que redux-thunk la maneje
  return (dispatch: Dispatch) => {
    return db.signings
      .toArray()
      .then(signatures => dispatch(signInitialization(signatures)));
  };
}

export function signUpdate(signature: SignUpdatePayload) {
  return {
    type: SIGN_UPDATE,
    payload: signature,
  };
}
