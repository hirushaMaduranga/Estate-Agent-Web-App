import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders search page by default', () => {
    render(<App />);
    expect(screen.getByText(/Estate Agent/i)).toBeInTheDocument();
  });
});
