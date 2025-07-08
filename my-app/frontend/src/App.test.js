import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders header with correct text', () => {
  render(<App />);
  const headerElement = screen.getByText(/your header text here/i);  // Change this to your actual header text
  expect(headerElement).toBeInTheDocument();
});

test('renders button with correct label', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /button label/i });  // Change this to the actual button label
  expect(buttonElement).toBeInTheDocument();
});
