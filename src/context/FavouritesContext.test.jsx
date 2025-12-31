import { renderHook, act } from '@testing-library/react';
import { FavouritesProvider, useFavourites } from './FavouritesContext';

const mockProperty1 = {
  id: 'test1',
  type: 'House',
  bedrooms: 3,
  price: 500000,
  tenure: 'Freehold',
  description: 'A lovely house',
  location: 'Test Street London W1',
  picture: 'https://example.com/pic1.jpg',
  images: [],
  floorPlan: 'https://example.com/floor1.jpg',
  listingType: 'sale',
  url: 'properties/test1.html',
  added: { month: 'January', day: 1, year: 2023 }
};

const mockProperty2 = {
  id: 'test2',
  type: 'Flat',
  bedrooms: 2,
  price: 350000,
  tenure: 'Leasehold',
  description: 'A nice flat',
  location: 'Another Street London NW1',
  picture: 'https://example.com/pic2.jpg',
  images: [],
  floorPlan: 'https://example.com/floor2.jpg',
  listingType: 'rent',
  url: 'properties/test2.html',
  added: { month: 'February', day: 15, year: 2023 }
};

describe('FavouritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with empty favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    });

    expect(result.current.favourites).toEqual([]);
  });

  it('should add a property to favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    });

    act(() => {
      result.current.addFavourite(mockProperty1);
    });

    expect(result.current.favourites).toHaveLength(1);
    expect(result.current.favourites[0].id).toBe('test1');
  });

  it('should prevent duplicate favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    });

    act(() => {
      result.current.addFavourite(mockProperty1);
      result.current.addFavourite(mockProperty1);
    });

    expect(result.current.favourites).toHaveLength(1);
  });

  it('should add multiple different properties', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    });

    act(() => {
      result.current.addFavourite(mockProperty1);
      result.current.addFavourite(mockProperty2);
    });

    expect(result.current.favourites).toHaveLength(2);
  });

  it('should remove a property from favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    });

    act(() => {
      result.current.addFavourite(mockProperty1);
      result.current.addFavourite(mockProperty2);
    });

    expect(result.current.favourites).toHaveLength(2);

    act(() => {
      result.current.removeFavourite('test1');
    });

    expect(result.current.favourites).toHaveLength(1);
    expect(result.current.favourites[0].id).toBe('test2');
  });

  it('should correctly identify if a property is a favourite', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    });

    act(() => {
      result.current.addFavourite(mockProperty1);
    });

    expect(result.current.isFavourite('test1')).toBe(true);
    expect(result.current.isFavourite('test2')).toBe(false);
  });

  it('should clear all favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    });

    act(() => {
      result.current.addFavourite(mockProperty1);
      result.current.addFavourite(mockProperty2);
    });

    expect(result.current.favourites).toHaveLength(2);

    act(() => {
      result.current.clearFavourites();
    });

    expect(result.current.favourites).toHaveLength(0);
  });

  it('should persist favourites to localStorage', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    });

    act(() => {
      result.current.addFavourite(mockProperty1);
    });

    const stored = localStorage.getItem('favourites');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe('test1');
  });

  it('should load favourites from localStorage on init', () => {
    localStorage.setItem('favourites', JSON.stringify([mockProperty1, mockProperty2]));

    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    });

    expect(result.current.favourites).toHaveLength(2);
    expect(result.current.favourites[0].id).toBe('test1');
    expect(result.current.favourites[1].id).toBe('test2');
  });
});
