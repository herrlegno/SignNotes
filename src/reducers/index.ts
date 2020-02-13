import { combineReducers } from 'redux';
import signReducer from './signs';
import monthReducer from './month';
import notificationsReducer from './notifications';

const rootReducer = combineReducers({
  signings: signReducer,
  date: monthReducer,
  notifications: notificationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
