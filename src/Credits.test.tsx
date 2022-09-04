import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppWrapper from 'AppWrapper';

test('renders Trailers SECTION', () => {
  render(<AppWrapper />);
  fireEvent.click(screen.getByText(/Credits/i));
  const linkElement = screen.getByText(/Trailers/i);
  expect(linkElement).toBeInTheDocument();
});
