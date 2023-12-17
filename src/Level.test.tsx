import { render, screen, fireEvent } from '@testing-library/react';
import { AppWrapper } from './AppWrapper';
import { useLevelData } from './useLevelData';
import { formatDate } from './formatDate';


jest.mock('react', () => {
  const React = jest.requireActual('react');
  React.Suspense = ({ children }: React.PropsWithChildren<{}>) => null;
  return React;
});

test('can show level codes', () => {
  const levelData = useLevelData()
  render(<AppWrapper />);
  fireEvent.click(screen.getByText(/To the levels/i));
  fireEvent.click(screen.getByText(formatDate(levelData.startDate)));
  const [level] = levelData.levels(1)
  fireEvent.click(screen.getByText(level.levelName));
  const levelCode = screen.getByText(level.levelCode);
  expect(levelCode).toBeInTheDocument();
});


test('can show maker ids', () => {
  const levelData = useLevelData()
  render(<AppWrapper />);
  const [level] = levelData.levels(1)
  fireEvent.click(screen.getByText(level.levelName));
  const makerId = screen.getByText(level.makerId);
  expect(makerId).toBeInTheDocument();
});