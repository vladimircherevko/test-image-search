import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '../store';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';

export const HistoryPage: FC = () => {
  const navHistory = useHistory();
  const history = useSelector((state: RootState) => state.history);
  const isUser = useSelector((state: RootState) => !!state.user);
  const extra = history.length ? '' : ' is empty';

  useEffect(() => {
    if (!isUser) {
      navHistory.push('/');
    }
  }, [ isUser, navHistory ]);

  return (
    <>
      <Navbar
        title='History page'
        link='/'
        action='Home'
        icon='home' />
      <Header title={ 'Search history' + extra } />
      <div className='container'>
        { extra && <h4 className='center-align cyan-text bold-text'>. . .</h4> }
        { history.map(keyword => (
          <h4
            className='center-align cyan-text bold-text'
            key={ keyword }>{ keyword }</h4>
        )) }
      </div>
    </>
  );
};
