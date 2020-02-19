import { SET_OPTIONS, OptionsActionType, Options } from './types';

const lsOpts = JSON.parse(localStorage.getItem('options') as string);

const initialState = lsOpts || {
  weeklyHours: '0',
};

if (!lsOpts) {
  localStorage.setItem('options', JSON.stringify(initialState));
}

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
