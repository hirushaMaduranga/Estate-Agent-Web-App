import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../utils/filterProperties';
import { useFavourites } from '../context/FavouritesContext';

interface PropertyCardProps {
  property: Property;
  onDragStart?: (e: React.DragEvent, property: Property) => void;
  draggable?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onDragStart,
  draggable = true 
}) => {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const favourite = isFavourite(property.id);

  const handleFavouriteClick = (e: React.MouseEvent) => {
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
      className="bg-cyan-100 rounded-lg overflow-hidden shadow hover:shadow-xl transition cursor-move relative"
    >
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative">
          <img
            src={property.picture}
            alt={property.location}
            className="w-full h-56 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">{property.location}</h3>
          <p className="text-gray-700 font-bold mb-2">Price: ${property.price.toLocaleString()}</p>
          <p className="text-gray-600 text-sm mb-1">Type: {property.type}</p>
          <p className="text-gray-600 text-sm mb-3">Bedrooms: {property.bedrooms}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={handleFavouriteClick}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition font-semibold text-sm"
        >
          {favourite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};
