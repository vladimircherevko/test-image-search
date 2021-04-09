import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactNotification from 'react-notifications-component';

import store from './store';
import { Routes } from './components/Routes';

const App: FC = () => {
  return (
    <Provider store={ store }>
      <ReactNotification />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
