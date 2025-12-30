import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ImageGallery } from '../components/ImageGallery';
import { TabPanel } from '../components/TabPanel';
import { GoogleMapEmbed } from '../components/GoogleMapEmbed';
import { useFavourites } from '../context/FavouritesContext';
import propertiesData from '../data/properties.json';

export const PropertyDetailsPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();

  const property = propertiesData.properties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const favourite = isFavourite(property.id);

  const handleFavouriteClick = () => {
    if (favourite) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  };

  const tabs = [
    {
      label: 'Description',
      content: (
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {property.description}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">Tenure</p>
              <p className="font-semibold text-lg text-gray-800">{property.tenure}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">Bedrooms</p>
              <p className="font-semibold text-lg text-gray-800">{property.bedrooms}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Floor Plan',
      content: (
        <div className="flex justify-center">
          {property.floorPlan ? (
            <img
              src={property.floorPlan}
              alt={`Floor plan of ${property.location}`}
              className="max-w-full h-auto rounded border border-gray-300"
            />
          ) : (
            <p className="text-gray-600">Floor plan not available</p>
          )}
        </div>
      ),
    },
    {
      label: 'Location',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 mb-4">{property.location}</p>
          <GoogleMapEmbed query={property.location} height={400} />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Estate Agent</h1>
          <Link
            to="/"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition font-semibold"
          >
            ← Back to Search
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 property-details">
        {/* Property Title & Price */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{property.location}</h2>
              <p className="text-4xl font-bold text-indigo-600">£{property.price.toLocaleString()}</p>
            </div>
            <button
              onClick={handleFavouriteClick}
              className="text-5xl hover:scale-110 transition"
              title={favourite ? 'Remove from favourites' : 'Add to favourites'}
            >
              {favourite ? '❤️' : '🤍'}
            </button>
          </div>
          <div className="flex gap-4 text-gray-600">
            <span className="bg-gray-100 px-3 py-1 rounded">{property.type}</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{property.bedrooms} bedrooms</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{property.tenure}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={property.images} propertyName={property.location} />

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow p-6">
          <TabPanel tabs={tabs} />
        </div>
      </div>
    </div>
  );
};
