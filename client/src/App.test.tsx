import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page', () => {
  render(<App />);
  const homePage = screen.getByText('Home page');
  expect(homePage).toBeInTheDocument();
});
