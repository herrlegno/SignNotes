import { combineReducers } from 'redux';
import signReducer from './signs';
import monthReducer from './month';

const rootReducer = combineReducers({
  sign: signReducer,
  date: monthReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
