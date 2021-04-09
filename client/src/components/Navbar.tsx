import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// import img from '../img';

export const Navbar: FC<{
  title: string;
  link: string;
  action: string;
  icon: string;
}> = ({ title, link, action, icon }) => {
  return (
    <Link to={ link }>
      <div className='navbar-fixed'>
        <div className='blue-grey darken-1 white-text fixed'>{ title }</div>
        <nav className='blue-grey darken-2 hoverable fixnav'>
          <div className='container'>
            <div className='nav-wrapper'>
              <div className='brand-logo'>
                <img
                  src='/image-search.png'
                  className='logo-img'
                  alt='logo' />
                <span className='hide-on-med-and-down logo-text'>
                  Image search
                </span>
              </div>
              <div className='right'>
                <span>
                  <i className='material-icons left'>{ icon }</i>
                  { action }
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </Link>
  );
};
