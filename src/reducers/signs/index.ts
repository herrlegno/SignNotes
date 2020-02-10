import { SignActionType, SIGN_IN, SIGN_OUT } from './types';

import db from '@app/config/db';

const signReducer = (state = {}, action: SignActionType) => {
  switch (action.type) {
    case SIGN_IN: {
      const {
        payload: { date },
      } = action;
      const formatDate = date.format('d-MM-YYYY');

      db.signings
        .add({
          date: formatDate,
          in: date.valueOf(),
        })
        .catch(() => {
          db.signings.update(formatDate, {
            in: date.valueOf(),
          });
        });
      return state;
    }

    case SIGN_OUT: {
      const {
        payload: { date },
      } = action;
      const formatDate = date.format('d-MM-YYYY');

      db.signings
        .add({
          date: formatDate,
          out: date.valueOf(),
        })
        .catch(() => {
          db.signings.update(formatDate, {
            out: date.valueOf(),
          });
        });
      return state;
    }

    default: {
      return state;
    }
  }
};

export default signReducer;
