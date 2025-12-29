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
    <Link
      to={`/property/${property.id}`}
      draggable={draggable}
      onDragStart={onDragStart ? (e) => onDragStart(e, property) : undefined}
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
    >
      <div className="relative">
        <img
          src={property.picture}
          alt={property.location}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleFavouriteClick}
          className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition"
          title={favourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <span className="text-xl">{favourite ? '❤️' : '🤍'}</span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{property.location}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold text-indigo-600">£{property.price.toLocaleString()}</span>
          <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded">{property.type}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{property.bedrooms} bedrooms • {property.tenure}</p>
        <p className="text-gray-700 text-sm line-clamp-3">{property.description}</p>
      </div>
    </Link>
  );
};
