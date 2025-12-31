import React from 'react';
import { useFavourites } from '../context/FavouritesContext';

export const FavouritesSidebar = ({
  onDragOver,
  onDrop,
  isOpen,
  onClose,
}) => {
  const { favourites, removeFavourite, clearFavourites } = useFavourites();

  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('propertyId', propertyId);
  };

  const handleDragEnd = (e, propertyId) => {
    // If dragged outside sidebar (to the left), remove from favourites
    const sidebar = document.querySelector('.favourites-sidebar');
    if (sidebar) {
      const rect = sidebar.getBoundingClientRect();
      if (e.clientX < rect.left) {
        removeFavourite(propertyId);
      }
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-lg transform transition-transform z-40 favourites-sidebar ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Favourites ({favourites.length})</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-140px)]">
          {favourites.length === 0 ? (
            <div className="p-4 text-center text-gray-600">
              <p className="mb-2">No favourites yet</p>
              <p className="text-sm">Drag properties here or click the heart icon</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {favourites.map((property) => (
                <div
                  key={property.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, property.id)}
                  onDragEnd={(e) => handleDragEnd(e, property.id)}
                  className="flex items-start justify-between p-3 transition border border-gray-200 rounded cursor-move bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">{property.location}</h3>
                    <p className="font-bold text-indigo-600">£{property.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">{property.bedrooms} beds • {property.type}</p>
                  </div>
                  <button
                    onClick={() => removeFavourite(property.id)}
                    className="flex-shrink-0 ml-2 text-red-500 hover:text-red-700"
                    title="Remove from favourites"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 bg-white border-t">
          {favourites.length > 0 && (
            <button
              onClick={clearFavourites}
              className="w-full py-2 text-sm font-semibold text-white transition bg-red-500 rounded hover:bg-red-600"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30"
          onClick={onClose}
        />
      )}
    </>
  );
};
