import React, { FC } from 'react';

import { Image } from '../store';
import { ImageListItem } from './ImageListItem';

export const ImageList: FC<{
  list: Array<Image>;
  likeHandle: (img: Image) => void;
}> = ({ list, likeHandle }) => {
  return (
    <div className='row'>
      { list.map(img => (
        <ImageListItem
          alt={ img.alt }
          key= { img.id }
          clickHandle={ () => likeHandle(img) }
          src={ img.src }
          title={ img.title }
          like={ img.like } />
      )) }
    </div>
  );
};
