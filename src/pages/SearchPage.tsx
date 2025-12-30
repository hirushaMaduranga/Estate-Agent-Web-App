import React, { useState, useMemo } from 'react';
import { SearchForm } from '../components/SearchForm';
import { PropertyCard } from '../components/PropertyCard';
import { FavouritesSidebar } from '../components/FavouritesSidebar';
import { filterProperties, FilterCriteria, Property } from '../utils/filterProperties';
import { useFavourites } from '../context/FavouritesContext';
import propertiesData from '../data/properties.json';

export const SearchPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [draggedProperty, setDraggedProperty] = useState<Property | null>(null);
  const { addFavourite } = useFavourites();

  const filteredProperties = useMemo(() => {
    return filterProperties(propertiesData.properties, filters);
  }, [filters]);

  const handleSearch = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
  };

  const handleDragStart = (_e: React.DragEvent, property: Property) => {
    setDraggedProperty(property);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedProperty) {
      addFavourite(draggedProperty);
      setDraggedProperty(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Estate Agent</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition font-semibold"
          >
            ❤️ Favourites
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <SearchForm onSearch={handleSearch} />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-700 font-semibold">
            Found <span className="text-indigo-600">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Property Grid */}
        <div className="search-results-grid">
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
      </div>

      {/* Favourites Sidebar */}
      <FavouritesSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    </div>
  );
};
