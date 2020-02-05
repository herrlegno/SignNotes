import { SignActionType, SIGN_IN, SIGN_OUT } from "./types";

import db from "db";

const signReducer = (state = {}, action: SignActionType) => {
  switch (action.type) {
    case SIGN_IN: {
      const {
        payload: { date }
      } = action;
      const formatDate = date.format("d-MM-YYYY");

      db.signings
        .add({
          date: formatDate,
          in: date.toDate()
        })
        .catch(() => {
          db.signings.update(formatDate, {
            in: date.toDate()
          });
        });
      return state;
    }

    case SIGN_OUT: {
      const {
        payload: { date }
      } = action;
      const formatDate = date.format("d-MM-YYYY");

      db.signings
        .add({
          date: formatDate,
          out: date.toDate()
        })
        .catch(() => {
          db.signings.update(formatDate, {
            out: date.toDate()
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
