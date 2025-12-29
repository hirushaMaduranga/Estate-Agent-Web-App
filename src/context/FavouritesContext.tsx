import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '../utils/filterProperties';

interface FavouritesContextType {
  favourites: Property[];
  addFavourite: (property: Property) => void;
  removeFavourite: (propertyId: string) => void;
  isFavourite: (propertyId: string) => boolean;
  clearFavourites: () => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<Property[]>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (property: Property) => {
    setFavourites((prev) => {
      // Prevent duplicates
      if (prev.some((p) => p.id === property.id)) {
        return prev;
      }
      return [property, ...prev];
    });
  };

  const removeFavourite = (propertyId: string) => {
    setFavourites((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const isFavourite = (propertyId: string) => {
    return favourites.some((p) => p.id === propertyId);
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const value: FavouritesContextType = {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
    clearFavourites,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }
  return context;
};
