import React from 'react';
import { Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';

export const PropertyCard = ({ 
  property, 
  onDragStart,
  draggable = true 
}) => {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const favourite = isFavourite(property.id);

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    if (favourite) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  };

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart ? (e) => onDragStart(e, property) : undefined}
      className="bg-white border-2 border-cyan-200 rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-move relative group"
    >
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={property.picture}
            alt={property.location}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">{property.location}</h3>
          <div className="space-y-2">
            <p className="text-2xl font-extrabold text-cyan-600">${property.price.toLocaleString()}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full font-semibold">{property.type}</span>
              <span className="text-gray-600 font-medium">{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-5 pb-5">
        <button
          onClick={handleFavouriteClick}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-lg hover:from-green-600 hover:to-green-700 active:scale-95 transition-all duration-200 font-semibold text-sm shadow-sm hover:shadow-md"
        >
          {favourite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>
    </div>
  );
};
