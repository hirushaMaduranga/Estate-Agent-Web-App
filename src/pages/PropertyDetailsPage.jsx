import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { ImageGallery } from '../components/ImageGallery';
import { GoogleMapEmbed } from '../components/GoogleMapEmbed';
import { useFavourites } from '../context/FavouritesContext';
import propertiesData from '../data/properties.json';

import 'react-tabs/style/react-tabs.css';

export const PropertyDetailsPage = () => {
  const { propertyId } = useParams();
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();

  const property = propertiesData.properties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Property Not Found</h2>
          <Link
            to="/"
            className="px-6 py-2 text-white transition bg-indigo-600 rounded hover:bg-indigo-700"
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container flex items-center justify-between px-6 py-5 mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Estate Agent</h1>
          <Link
            to="/"
            className="px-5 py-2.5 font-semibold text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900"
          >
            ← Back to Search
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
          {/* Property Title & Price */}
          <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-white sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                  {property.location}
                </h2>
                <p className="mb-4 text-4xl font-extrabold text-indigo-600 sm:text-5xl">
                  £{property.price.toLocaleString()}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm">
                    {property.type}
                  </span>
                  <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm">
                    {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </span>
                  <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm">
                    {property.tenure}
                  </span>
                </div>
              </div>
              <button
                onClick={handleFavouriteClick}
                className="text-5xl transition-transform hover:scale-110 active:scale-95"
                title={favourite ? 'Remove from favourites' : 'Add to favourites'}
                aria-label={favourite ? 'Remove from favourites' : 'Add to favourites'}
              >
                {favourite ? '❤️' : '🤍'}
              </button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="p-6 border-b bg-gray-50 sm:p-8">
            <ImageGallery images={property.images} propertyName={property.location} />
          </div>

          {/* Tabs - React Tabs Library */}
          <div className="p-6 sm:p-8">
            <Tabs className="property-tabs">
              <TabList className="flex mb-6 space-x-1 overflow-x-auto border-b border-gray-200">
                <Tab 
                  className="px-6 py-3 text-sm font-medium text-gray-600 transition-colors cursor-pointer whitespace-nowrap hover:text-indigo-600 focus:outline-none"
                  selectedClassName="text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                >
                  Description
                </Tab>
                <Tab 
                  className="px-6 py-3 text-sm font-medium text-gray-600 transition-colors cursor-pointer whitespace-nowrap hover:text-indigo-600 focus:outline-none"
                  selectedClassName="text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                >
                  Floor Plan
                </Tab>
                <Tab 
                  className="px-6 py-3 text-sm font-medium text-gray-600 transition-colors cursor-pointer whitespace-nowrap hover:text-indigo-600 focus:outline-none"
                  selectedClassName="text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                >
                  Location
                </Tab>
              </TabList>

              <TabPanel className="pt-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-900">Overview</h3>
                    <p className="text-base leading-relaxed text-gray-700" style={{ lineHeight: '1.8' }}>
                      {property.description || property.longDescription || 'No description available.'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">Key Information</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="p-5 transition-shadow border border-gray-200 rounded-xl bg-gray-50 hover:shadow-md">
                        <p className="mb-1 text-sm font-medium text-gray-600">Tenure</p>
                        <p className="text-lg font-semibold text-gray-900">{property.tenure}</p>
                      </div>
                      <div className="p-5 transition-shadow border border-gray-200 rounded-xl bg-gray-50 hover:shadow-md">
                        <p className="mb-1 text-sm font-medium text-gray-600">Bedrooms</p>
                        <p className="text-lg font-semibold text-gray-900">{property.bedrooms}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel className="pt-4">
                <div className="overflow-hidden rounded-xl">
                  {property.floorPlan ? (
                    <div className="flex justify-center">
                      <img
                        src={property.floorPlan}
                        alt={`Floor plan of ${property.location}`}
                        className="w-full h-auto border border-gray-200 shadow-md rounded-xl"
                        style={{ maxHeight: '600px', objectFit: 'contain' }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-12 text-center bg-gray-50 rounded-xl">
                      <div>
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-600">Floor plan not available</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabPanel>

              <TabPanel className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-900">Location</h3>
                    <p className="mb-4 text-base text-gray-700">{property.location}</p>
                  </div>
                  <div className="overflow-hidden border border-gray-200 shadow-md rounded-xl">
                    <GoogleMapEmbed query={property.location} height={380} />
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};