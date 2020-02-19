import { SET_OPTIONS, OptionsActionType, Options } from './types';

const initialState = JSON.parse(
  localStorage.getItem('options') as string,
) || {
  weeklyHours: '0',
};

const optionsReducer = (
  state: Options = initialState,
  action: OptionsActionType,
) => {
  switch (action.type) {
    case SET_OPTIONS: {
      localStorage.setItem('options', JSON.stringify(action.payload));
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default optionsReducer;
