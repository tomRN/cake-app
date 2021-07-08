import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the text "cakes" somewhere', () => {
  render(<App />);
  const titleElement = screen.getByText(/Cakes/i);
  expect(titleElement).toBeInTheDocument();
});
