import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { NotificationManager } from '@app/components';
import * as serviceWorker from './serviceWorker';
import store from '@app/config/store';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'index.css';

ReactDOM.render(
  <Provider store={store}>
    <NotificationManager />
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
