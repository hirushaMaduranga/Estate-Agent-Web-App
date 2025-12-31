import React, { createContext, useContext, useState, useEffect } from 'react';

const FavouritesContext = createContext(undefined);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (property) => {
    setFavourites((prev) => {
      // Prevent duplicates
      if (prev.some((p) => p.id === property.id)) {
        return prev;
      }
      return [property, ...prev];
    });
  };

  const removeFavourite = (propertyId) => {
    setFavourites((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const isFavourite = (propertyId) => {
    return favourites.some((p) => p.id === propertyId);
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const value = {
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
