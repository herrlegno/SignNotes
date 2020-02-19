import {
  SignActionType,
  SIGN_IN,
  SIGN_OUT,
  SIGN_INITIALIZATION,
  SIGN_UPDATE,
} from './types';

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
