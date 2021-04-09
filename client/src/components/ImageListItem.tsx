import React, { FC } from 'react';

export const ImageListItem: FC<{
  alt: string;
  src: string;
  title: string;
  clickHandle: () => void;
  like: boolean;
}> = ({ alt, src, title, clickHandle, like }) => {
  const cardClass = like ? 'card' : 'card  hoverable';
  return (
    <div className='col s8 offset-s2 m6 l4'>
      <div
        className={ cardClass }
        onClick={ clickHandle }>
        <div className='card-image img-card'>
          <img
            src={ src }
            alt={ alt } />
          {like && (
            <span className='btn-floating halfway-fab yellow accent-2 btn-large non-hoverable'>
              <i className='material-icons'>favorite</i>
            </span>
          )}
        </div>
        <div className='card-content'>
          <span className='truncate deep-orange-text text-darken-4 bold-text'>
            { title }
          </span>
        </div>
      </div>
    </div>
  );
};
