import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { getSignatures } from '@app/reducers/signs/actions';
import reducer from '../reducers';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

// @ts-ignore // TODO: Remove when type 'getSignatures()'
store.dispatch(getSignatures());

export default store;
