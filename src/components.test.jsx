import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import { PropertyCard } from './components/PropertyCard';
import { SearchForm } from './components/SearchForm';
import { TabPanel } from './components/TabPanel';

const mockProperty = {
  id: 'test1',
  type: 'House',
  bedrooms: 3,
  price: 500000,
  tenure: 'Freehold',
  description: 'A lovely house',
  location: 'Test Street London W1',
  picture: 'https://example.com/pic.jpg',
  images: [],
  floorPlan: 'https://example.com/floor.jpg',
  listingType: 'sale',
  url: 'properties/test1.html',
  added: { month: 'January', day: 1, year: 2023 }
};

describe('PropertyCard Component', () => {
  it('renders property information correctly', () => {
    render(
      <BrowserRouter>
        <FavouritesProvider>
          <PropertyCard property={mockProperty} />
        </FavouritesProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Test Street London W1/i)).toBeInTheDocument();
    expect(screen.getByText(/\$500,000/i)).toBeInTheDocument();
    expect(screen.getByText(/3 bedrooms/i)).toBeInTheDocument();
  });

  it('displays favourite button', () => {
    render(
      <BrowserRouter>
        <FavouritesProvider>
          <PropertyCard property={mockProperty} />
        </FavouritesProvider>
      </BrowserRouter>
    );

    const favouriteButton = screen.getByRole('button', { name: /add to favorites/i });
    expect(favouriteButton).toBeInTheDocument();
  });
});

describe('SearchForm Component', () => {
  it('renders all filter inputs', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    expect(screen.getByText(/Property Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Min Bedrooms/i)).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const submitButton = screen.getByText(/Search Properties/i);
    fireEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('allows user to select property type', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const typeSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(typeSelect, { target: { value: 'House' } });

    expect(typeSelect.value).toBe('House');
  });
});

describe('TabPanel Component', () => {
  const mockTabs = [
    { label: 'Tab 1', content: <div>Content 1</div> },
    { label: 'Tab 2', content: <div>Content 2</div> },
  ];

  it('renders all tab labels', () => {
    render(<TabPanel tabs={mockTabs} />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('displays first tab content by default', () => {
    render(<TabPanel tabs={mockTabs} />);

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('switches tab content when clicked', () => {
    render(<TabPanel tabs={mockTabs} />);

    const tab2Button = screen.getByText('Tab 2');
    fireEvent.click(tab2Button);

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
