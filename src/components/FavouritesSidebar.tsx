import React from 'react';
import { useFavourites } from '../context/FavouritesContext';

interface FavouritesSidebarProps {
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const FavouritesSidebar: React.FC<FavouritesSidebarProps> = ({
  onDragOver,
  onDrop,
  isOpen,
  onClose,
}) => {
  const { favourites, removeFavourite, clearFavourites } = useFavourites();

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
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Favourites ({favourites.length})</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
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
                  className="bg-gray-50 p-3 rounded border border-gray-200 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-800">{property.location}</h3>
                    <p className="text-indigo-600 font-bold">£{property.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">{property.bedrooms} beds • {property.type}</p>
                  </div>
                  <button
                    onClick={() => removeFavourite(property.id)}
                    className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
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
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 space-y-2">
          {favourites.length > 0 && (
            <button
              onClick={clearFavourites}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm font-semibold"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={onClose}
        />
      )}
    </>
  );
};
