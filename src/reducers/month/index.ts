import { MonthActionType, NEXT_MONTH, PREV_MONTH } from './types';
import moment from '@app/config/moment';

const { years, months } = moment().toObject();
const initialState = { years, months };

const monthReducer = (
  state = initialState,
  action: MonthActionType,
) => {
  switch (action.type) {
    case NEXT_MONTH: {
      const date = moment(state).add(1, 'months');

      const { years, months } = date.toObject();
      return { years, months };
    }
    case PREV_MONTH: {
      const date = moment(state).subtract(1, 'months');

      const { years, months } = date.toObject();
      return { years, months };
    }
    default: {
      return state;
    }
  }
};

export default monthReducer;
