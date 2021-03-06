import React from 'react';
import { Home, Options, Report } from './views';
import { RouteProps } from 'react-router';
import { Redirect } from 'react-router-dom';

const routes: RouteProps[] = [
  {
    path: '/options',
    exact: true,
    component: Options,
  },
  {
    path: '/report',
    exact: true,
    component: Report,
  },
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '*',
    render: () => <Redirect to='/' />,
  },
];

export default routes;
