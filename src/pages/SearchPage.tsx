import React, { useState, useMemo } from 'react';
import { SearchForm } from '../components/SearchForm';
import { PropertyCard } from '../components/PropertyCard';
import { filterProperties, FilterCriteria, Property } from '../utils/filterProperties';
import { useFavourites } from '../context/FavouritesContext';
import propertiesData from '../data/properties.json';

export const SearchPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [draggedProperty, setDraggedProperty] = useState<Property | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { favourites, addFavourite, removeFavourite } = useFavourites();

  const filteredProperties = useMemo(() => {
    return filterProperties(propertiesData.properties, filters);
  }, [filters]);

  const handleSearch = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
  };

  const handleDragStart = (e: React.DragEvent, property: Property) => {
    setDraggedProperty(property);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleFavoritesDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleFavoritesDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedProperty) {
      addFavourite(draggedProperty);
      setDraggedProperty(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="hero-section relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Estate Agent Property Finder - Your<br />Gateway to Homes
          </h1>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="e.g., House, Apartment, London"
              className="px-4 py-3 rounded-lg w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              For Sale
            </button>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              To Rent
            </button>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              Show All
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Search Toggle */}
      <div className="bg-blue-600 py-3 text-center">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition font-semibold"
        >
          {showAdvanced ? 'Hide Advanced Search' : 'Show Advanced Search'}
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Advanced Search Form */}
        {showAdvanced && (
          <div className="mb-8">
            <SearchForm onSearch={handleSearch} />
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-700 font-semibold text-lg">
            Found <span className="text-blue-600">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Property Grid */}
        <div className="search-results-grid mb-12">
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
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No properties found matching your criteria</p>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </div>

        {/* Favorites Section */}
        <div className="mt-16 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Favorites</h2>
          <div
            onDragOver={handleFavoritesDragOver}
            onDrop={handleFavoritesDrop}
            className="min-h-[200px] border-4 border-dashed border-gray-300 rounded-lg bg-white p-8 transition-colors hover:border-blue-400 hover:bg-blue-50"
          >
            {favourites.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-2">No favorites added yet!</p>
                <p className="text-gray-500">Drag properties here or click "Add to Favorites" button</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favourites.map((property) => (
                  <div
                    key={property.id}
                    className="bg-cyan-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition relative"
                  >
                    <img
                      src={property.picture}
                      alt={property.location}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 text-sm">{property.location}</h3>
                      <p className="text-gray-700 font-bold mb-1">Price: ${property.price.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm mb-1">Type: {property.type}</p>
                      <p className="text-gray-600 text-sm">Bedrooms: {property.bedrooms}</p>
                      <button
                        onClick={() => removeFavourite(property.id)}
                        className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm font-semibold"
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
