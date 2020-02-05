import { SignPayload, SignActionType, SIGN_IN, SIGN_OUT } from "./types";

export function signIn(signature: SignPayload): SignActionType {
  return {
    type: SIGN_IN,
    payload: signature
  };
}

export function signOut(signature: SignPayload): SignActionType {
  return {
    type: SIGN_OUT,
    payload: signature
  };
}
