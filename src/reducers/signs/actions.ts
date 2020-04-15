import {
  SignPayload,
  SignActionType,
  SIGN_IN,
  SIGN_OUT,
  SIGN_INITIALIZATION,
  SignUpdatePayload,
  SIGN_UPDATE,
  SIGN_ERROR,
  SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
  SET_HOLIDAY,
  SET_HOLIDAY_REQUEST,
  SET_HOLIDAY_ERROR,
} from './types';
import db, { Signature } from '@app/config/db';
import { Dispatch } from 'redux';
import { pushNotification } from '@app/reducers/notifications/actions';
import { AddActionPayload } from '@app/reducers/notifications/types';
import Dexie from 'dexie';

function signInRequest() {
  return {
    type: SIGN_IN_REQUEST,
  };
}

function signOutRequest() {
  return {
    type: SIGN_OUT_REQUEST,
  };
}

function setSignIn(signature: SignPayload): SignActionType {
  return {
    type: SIGN_IN,
    payload: signature,
  };
}

// Redux-Thunk function
export function signIn(signature: SignPayload) {
  return (dispatch: Dispatch) => {
    const { date } = signature;
    const formatDate = date.format('DD-MM-YYYY');
    const signIn = date.valueOf();

    dispatch(signInRequest());

    return db.signings
      .add({
        date: formatDate,
        in: signIn,
      })
      .then(() => {
        dispatch(setSignIn(signature));
        const notification: AddActionPayload = {
          type: 'success',
          message: 'Firma añadida!',
        };

        return dispatch(pushNotification(notification));
      })
      .catch('ConstraintError', () => {
        return db.signings
          .update(formatDate, {
            in: signIn,
          })
          .then(() => {
            dispatch(setSignIn(signature));
            const notification: AddActionPayload = {
              type: 'success',
              message: 'Firma añadida!',
            };

            return dispatch(pushNotification(notification));
          });
      })
      .catch(Dexie.ModifyError, (e) => {
        dispatch(throwSignError());
        const notification: AddActionPayload = {
          type: 'error',
          message: e.failures[0].message,
        };

        return dispatch(pushNotification(notification));
      })
      .catch(Error, (e) => {
        dispatch(throwSignError());
        const notification: AddActionPayload = {
          type: 'error',
          message: e.message,
        };

        return dispatch(pushNotification(notification));
      });
  };
}

function setSignOut(signature: SignPayload): SignActionType {
  return {
    type: SIGN_OUT,
    payload: signature,
  };
}

// Redux-Thunk function
export function signOut(signature: SignPayload) {
  return (dispatch: Dispatch) => {
    const { date } = signature;
    const formatDate = date.format('DD-MM-YYYY');
    const signOut = date.valueOf();

    dispatch(signOutRequest());

    return db.signings
      .add({
        date: formatDate,
        out: signOut,
      })
      .catch('ConstraintError', () => {
        return db.signings
          .update(formatDate, {
            out: signOut,
          })
          .then(() => {
            dispatch(setSignOut(signature));
            const notification: AddActionPayload = {
              type: 'success',
              message: 'Firma añadida!',
            };

            return dispatch(pushNotification(notification));
          });
      })
      .catch(Dexie.ModifyError, (e) => {
        dispatch(throwSignError());
        const notification: AddActionPayload = {
          type: 'error',
          message: e.failures[0].message,
        };

        return dispatch(pushNotification(notification));
      })
      .catch((e) => {
        dispatch(throwSignError());
        const notification: AddActionPayload = {
          type: 'error',
          message: e.message,
        };

        return dispatch(pushNotification(notification));
      });
  };
}

function signInitialization(signatures: Signature[]): SignActionType {
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
      .then((signatures) => dispatch(signInitialization(signatures)));
  };
}

// Redux-Thunk function
export function signUpdate(signature: SignUpdatePayload) {
  return (dispatch: Dispatch) => {
    const { date, in: signIn, out: signOut } = signature;
    const formatDate = date.format('DD-MM-YYYY');

    if (signIn && signOut) {
      return db.signings
        .add({
          date: formatDate,
          in: signIn.valueOf(),
          out: signOut.valueOf(),
        })
        .then(() => {
          dispatch(setSignUpdate(signature));
          const notification: AddActionPayload = {
            type: 'success',
            message: 'Firma añadida!',
          };

          return dispatch(pushNotification(notification));
        })
        .catch('ConstraintError', () => {
          return db.signings
            .update(formatDate, {
              in: signIn.valueOf(),
              out: signOut.valueOf(),
            })
            .then(() => {
              dispatch(setSignUpdate(signature));
              const notification: AddActionPayload = {
                type: 'success',
                message: 'Firma añadida!',
              };

              return dispatch(pushNotification(notification));
            });
        })
        .catch(Dexie.ModifyError, (e) => {
          dispatch(throwSignError());
          const notification: AddActionPayload = {
            type: 'error',
            message: e.failures[0].message,
          };

          return dispatch(pushNotification(notification));
        })
        .catch(Error, (e) => {
          dispatch(throwSignError());
          const notification: AddActionPayload = {
            type: 'error',
            message: e.message,
          };

          return dispatch(pushNotification(notification));
        });
    } else if (signIn) {
      return db.signings
        .add({
          date: formatDate,
          in: signIn.valueOf(),
        })
        .then(() => {
          dispatch(setSignIn({ date: signIn.clone() }));
          const notification: AddActionPayload = {
            type: 'success',
            message: 'Firma añadida!',
          };

          return dispatch(pushNotification(notification));
        })
        .catch('ConstraintError', () => {
          return db.signings
            .update(formatDate, {
              in: signIn.valueOf(),
            })
            .then(() => {
              dispatch(setSignIn({ date: signIn.clone() }));
              const notification: AddActionPayload = {
                type: 'success',
                message: 'Firma añadida!',
              };

              dispatch(pushNotification(notification));
            });
        })
        .catch(Error, (e) => {
          dispatch(throwSignError());
          const notification: AddActionPayload = {
            type: 'error',
            message: e.message,
          };

          return dispatch(pushNotification(notification));
        });
    } else if (signOut) {
      return db.signings
        .add({
          date: formatDate,
          out: signOut.valueOf(),
        })
        .then(() => {
          dispatch(setSignOut({ date: signOut.clone() }));
          const notification: AddActionPayload = {
            type: 'success',
            message: 'Firma añadida!',
          };

          dispatch(pushNotification(notification));
        })
        .catch('ConstraintError', () => {
          return db.signings
            .update(formatDate, {
              out: signOut.valueOf(),
            })
            .then(() => {
              dispatch(setSignOut({ date: signOut.clone() }));
              const notification: AddActionPayload = {
                type: 'success',
                message: 'Firma añadida!',
              };

              dispatch(pushNotification(notification));
            });
        })
        .catch(Error, (e) => {
          dispatch(throwSignError());
          const notification: AddActionPayload = {
            type: 'error',
            message: e.message,
          };

          return dispatch(pushNotification(notification));
        });
    }
  };
}

function setSignUpdate(signature: SignUpdatePayload): SignActionType {
  return {
    type: SIGN_UPDATE,
    payload: signature,
  };
}

function throwSignError(): SignActionType {
  return {
    type: SIGN_ERROR,
  };
}

function setHolidayAction(signature: SignPayload, holiday: boolean) {
  return {
    type: SET_HOLIDAY,
    payload: { ...signature, holiday },
  };
}

function setHolidayRequest() {
  return {
    type: SET_HOLIDAY_REQUEST,
  };
}

function throwSetHolidayError() {
  return {
    type: SET_HOLIDAY_ERROR,
  };
}

export function setHoliday(signature: SignPayload, holiday: boolean) {
  return (dispatch: Dispatch) => {
    const { date } = signature;
    const formatDate = date.format('DD-MM-YYYY');

    dispatch(setHolidayRequest());

    return db.signings
      .add({
        date: formatDate,
        holiday,
      })
      .then(() => {
        dispatch(setHolidayAction(signature, holiday));
        const notification: AddActionPayload = {
          type: 'success',
          message: `Festivo ${holiday ? 'añadido' : 'quitado'}!`,
        };

        return dispatch(pushNotification(notification));
      })
      .catch('ConstraintError', () => {
        return db.signings
          .put({
            date: formatDate,
            holiday,
          })
          .then(() => {
            dispatch(setHolidayAction(signature, holiday));
            const notification: AddActionPayload = {
              type: 'success',
              message: `Festivo ${holiday ? 'añadido' : 'quitado'}!`,
            };

            return dispatch(pushNotification(notification));
          });
      })
      .catch(Dexie.ModifyError, (e) => {
        dispatch(throwSetHolidayError());
        const notification: AddActionPayload = {
          type: 'error',
          message: e.failures[0].message,
        };

        return dispatch(pushNotification(notification));
      })
      .catch(Error, (e) => {
        dispatch(throwSetHolidayError());
        const notification: AddActionPayload = {
          type: 'error',
          message: e.message,
        };

        return dispatch(pushNotification(notification));
      });
  };
}
