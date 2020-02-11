import {
  SignActionType,
  SIGN_IN,
  SIGN_OUT,
  SIGN_INITIALIZATION,
  SIGN_UPDATE,
} from './types';

import db from '@app/config/db';

interface StateSignature {
  in?: number;
  out?: number;
}

interface StateSignings {
  [index: string]: StateSignature;
}

const signReducer = (
  state: StateSignings = {},
  action: SignActionType,
) => {
  switch (action.type) {
    case SIGN_IN: {
      const {
        payload: { date },
      } = action;
      const formatDate = date.format('DD-MM-YYYY');
      const signIn = date.valueOf();

      db.signings
        .add({
          date: formatDate,
          in: signIn,
        })
        .catch(() => {
          db.signings.update(formatDate, {
            in: signIn,
          });
        });

      // TODO: handle errors
      let entry = state[formatDate];
      entry = { ...entry, in: signIn };

      return { ...state, [formatDate]: entry };
    }

    case SIGN_OUT: {
      const {
        payload: { date },
      } = action;
      const formatDate = date.format('DD-MM-YYYY');
      const signOut = date.valueOf();

      db.signings
        .add({
          date: formatDate,
          out: signOut,
        })
        .catch(() => {
          db.signings.update(formatDate, {
            out: signOut,
          });
        });

      // TODO: handle errors
      let entry = state[formatDate];
      entry = { ...entry, out: signOut };

      return { ...state, [formatDate]: entry };
    }

    case SIGN_INITIALIZATION: {
      const signings: StateSignings = {};
      action.payload.forEach(signature => {
        signings[signature.date] = {
          in: signature.in,
          out: signature.out,
        };
      });
      return signings;
    }

    case SIGN_UPDATE: {
      const {
        payload: { date, in: signIn, out: signOut },
      } = action;

      const formatDate = date.format('DD-MM-YYYY');

      if (signIn && signOut) {
        db.signings
          .add({
            date: formatDate,
            in: signIn.valueOf(),
            out: signOut.valueOf(),
          })
          .catch(() => {
            db.signings.update(formatDate, {
              in: signIn.valueOf(),
              out: signOut.valueOf(),
            });
          });
      } else if (signIn) {
        db.signings
          .add({
            date: formatDate,
            in: signIn.valueOf(),
          })
          .catch(() => {
            db.signings.update(formatDate, {
              in: signIn.valueOf(),
            });
          });
      } else if (signOut) {
        db.signings
          .add({
            date: formatDate,
            out: signOut.valueOf(),
          })
          .catch(() => {
            db.signings.update(formatDate, {
              out: signOut.valueOf(),
            });
          });
      }

      let entry = state[formatDate];

      if (signIn && signOut) {
        entry = {
          ...entry,
          in: signIn.valueOf(),
          out: signOut.valueOf(),
        };
      } else if (signIn) {
        entry = {
          ...entry,
          in: signIn.valueOf(),
        };
      } else if (signOut) {
        entry = { ...entry, out: signOut.valueOf() };
      }

      return { ...state, [formatDate]: entry };
    }

    default: {
      return state;
    }
  }
};

export default signReducer;
