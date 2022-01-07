import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const headerEl = screen.getByText(/Mehmet Yılmaz - Luxoft Slot Machine Coding Challenge/i);
  expect(headerEl).toBeInTheDocument();
});
