import { combineReducers } from 'redux';
import signReducer from './signs';
import monthReducer from './month';
import notificationsReducer from './notifications';
import optionsReducer from './options';

const rootReducer = combineReducers({
  signings: signReducer,
  date: monthReducer,
  notifications: notificationsReducer,
  options: optionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
