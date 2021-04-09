import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../store';
import { MainPage } from './Main';

/**
 * Unit test scenarios for MainPage
 */
describe('component: MainPage', () => {

  beforeEach(() => {
    render(
      <Provider store={ store }>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders the main page with basic elements', () => {
    const homePageTitle = screen.getByText('Home page');
    expect(homePageTitle).toBeInTheDocument();

    const historyLink = screen.getByRole('link');
    expect(historyLink).toHaveAttribute('href', '/history');

    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('hoverable');

    const logoImage = screen.getByRole('img');
    expect(logoImage).toHaveClass('logo-img');
    expect(logoImage).toHaveAttribute('src', '/image-search.png');

    const headerElement = screen.getByText('Finding a picture is easy!');
    expect(headerElement).toBeInTheDocument();

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('');
    expect(inputElement).toHaveAttribute('id', 'keyword');

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  // should be more suits
});
