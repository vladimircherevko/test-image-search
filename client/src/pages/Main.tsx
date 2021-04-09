import React, { FC, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { search, getUser, setLike } from '../store/actions';
import { RootState, AppDispatch, Image } from '../store';
import { ImageList } from '../components/ImageList';
import { Navbar } from '../components/Navbar';
import { Header } from '../components/Header';
import { SearchForm } from '../components/SearchForm';
import { showWarning, showInfo } from '../utils/message';

export const MainPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const images = useSelector((state: RootState) => state.images);
  const loading = useSelector((state: RootState) => state.loading);
  const theme = useSelector((state: RootState) => state.theme);
  const [ searchForm, setSearchForm ] = useState(theme);
  const isEmpty = !images.length;
  
  useEffect(() => {
    dispatch(getUser());
  }, [ dispatch ]);

  const changeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchForm(event.target.value.replace(/\s/g, ''));
  };

  const likeHandle = (img: Image) => {
    if (!img.like && !loading) {
      dispatch(setLike(img.id));
    }
  };

  const submitHandle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchForm) {
      showWarning('Enter your search keyword');
    } else if (searchForm === theme) {
      showInfo('Images already found');
    } else {
      dispatch(search(searchForm));
    }
  };

  return (
    <>
      <Navbar
        title='Home page'
        link='/history'
        action='History'
        icon='history' />
      <Header title={ 'Finding a picture is easy!' } />
      <div className='container'>
        <div className='row'>
          <SearchForm
            change={ changeHandle }
            value={ searchForm }
            lock={ loading }
            submit={ submitHandle } />
        </div>
        <div className='row'>
          { isEmpty && <h4 className='center-align cyan-text bold-text'>. . .</h4> }
          <ImageList
            list={ images }
            likeHandle={ likeHandle } />
        </div>
      </div>
    </>
  );
};
