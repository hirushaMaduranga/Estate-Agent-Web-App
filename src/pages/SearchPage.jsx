import React, { useState, useMemo } from 'react';
import { SearchForm } from '../components/SearchForm';
import { PropertyCard } from '../components/PropertyCard';
import { filterProperties } from '../utils/filterProperties';
import { useFavourites } from '../context/FavouritesContext';
import propertiesData from '../data/properties.json';

export const SearchPage = () => {
  const [filters, setFilters] = useState({});
  const [draggedProperty, setDraggedProperty] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [listingMode, setListingMode] = useState('all');
  const { favourites, addFavourite, removeFavourite } = useFavourites();

  const filteredProperties = useMemo(() => {
    let properties = filterProperties(propertiesData.properties, filters);
    
    // Apply listing mode filter
    if (listingMode !== 'all') {
      properties = properties.filter((prop) => prop.listingType === listingMode);
    }
    
    return properties;
  }, [filters, listingMode]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDragStart = (e, property) => {
    setDraggedProperty(property);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleFavoritesDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleFavoritesDrop = (e) => {
    e.preventDefault();
    if (draggedProperty) {
      addFavourite(draggedProperty);
      setDraggedProperty(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 ">
      {/* Hero Section */}
      <div className="relative bg-center bg-cover hero-section hero-bg">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="container relative z-10 px-4 py-20 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl animate-hero-title">
            Estate Agent Property Finder - Your<br />Gateway to Homes
          </h1>
          <div className="flex flex-col items-center justify-center max-w-3xl gap-4 mx-auto md:flex-row">
            <input
              type="text"
              placeholder="e.g., House, Apartment, London"
              className="w-full px-4 py-3 rounded-lg md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setListingMode('sale')}
              className={`px-8 py-3 font-semibold text-white transition rounded-lg ${
                listingMode === 'sale'
                  ? 'bg-blue-800 ring-2 ring-white'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setListingMode('rent')}
              className={`px-8 py-3 font-semibold text-white transition rounded-lg ${
                listingMode === 'rent'
                  ? 'bg-blue-800 ring-2 ring-white'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              To Rent
            </button>
            <button
              onClick={() => setListingMode('all')}
              className={`px-8 py-3 font-semibold text-white transition rounded-lg ${
                listingMode === 'all'
                  ? 'bg-blue-800 ring-2 ring-white'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Show All
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Search Toggle */}
      <div className="py-3 text-center bg-blue-600">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-6 py-2 font-semibold text-white transition bg-green-500 rounded hover:bg-green-600"
        >
          {showAdvanced ? 'Hide Advanced Search' : 'Show Advanced Search'}
        </button>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-8 mx-auto">
        {/* Advanced Search Form */}
        {showAdvanced && (
          <div className="mb-8">
            <SearchForm onSearch={handleSearch} />
          </div>
        )}

        {/* Property Grid */}
        <div className="mb-12 search-results-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onDragStart={handleDragStart}
                draggable={true}
              />
            ))
          ) : (
            <div className="py-12 text-center col-span-full">
              <p className="text-lg text-gray-600">No properties found matching your criteria</p>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </div>

        {/* Favorites Section */}
        <div className="mt-16 mb-12">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-800 animate-section-heading">Favorites</h2>
          <div
            onDragOver={handleFavoritesDragOver}
            onDrop={handleFavoritesDrop}
            className="min-h-[200px] border-4 border-dashed border-gray-300 rounded-lg bg-white p-8 transition-colors hover:border-blue-400 hover:bg-blue-50"
          >
            {favourites.length === 0 ? (
              <div className="py-12 text-center">
                <p className="mb-2 text-lg text-gray-600">No favorites added yet!</p>
                <p className="text-gray-500">Drag properties here or click "Add to Favorites" button</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favourites.map((property) => (
                  <div
                    key={property.id}
                    className="relative overflow-hidden transition rounded-lg shadow bg-cyan-100 hover:shadow-lg"
                  >
                    <img
                      src={property.picture}
                      alt={property.location}
                      className="object-cover w-full h-40"
                    />
                    <div className="p-4">
                      <h3 className="mb-2 text-sm font-semibold text-gray-800">{property.location}</h3>
                      <p className="mb-1 font-bold text-gray-700">Price: ${property.price.toLocaleString()}</p>
                      <p className="mb-1 text-sm text-gray-600">Type: {property.type}</p>
                      <p className="text-sm text-gray-600">Bedrooms: {property.bedrooms}</p>
                      <button
                        onClick={() => removeFavourite(property.id)}
                        className="w-full py-2 mt-3 text-sm font-semibold text-white transition bg-red-500 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
