import { render, screen } from '@testing-library/react';
import AppWrapper from './AppWrapper';

test('renders About button', () => {
  render(<AppWrapper />);
  const linkElement = screen.getByText(/About/i);
  expect(linkElement).toBeInTheDocument();
});
