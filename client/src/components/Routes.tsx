import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { MainPage } from '../pages/Main';
import { HistoryPage } from '../pages/History';

export const Routes: FC = () => (
  <Switch>
    <Route
      path='/'
      exact
      component={ MainPage } />
    <Route
      path='/history'
      exact
      component={ HistoryPage } />
    <Redirect to='/' />
  </Switch>
);
