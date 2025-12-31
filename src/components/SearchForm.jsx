import React, { useState } from 'react';

export const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState('Any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBeds, setMinBeds] = useState('');
  const [maxBeds, setMaxBeds] = useState('');
  const [dateAfter, setDateAfter] = useState('');
  const [dateBetweenStart, setDateBetweenStart] = useState('');
  const [dateBetweenEnd, setDateBetweenEnd] = useState('');
  const [postcodeArea, setPostcodeArea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      type: type !== 'Any' ? type : null,
      minPrice: minPrice !== '' ? Number(minPrice) : null,
      maxPrice: maxPrice !== '' ? Number(maxPrice) : null,
      minBeds: minBeds !== '' ? Number(minBeds) : null,
      maxBeds: maxBeds !== '' ? Number(maxBeds) : null,
      dateAfter: dateAfter ? new Date(dateAfter) : null,
      dateBetweenStart: dateBetweenStart ? new Date(dateBetweenStart) : null,
      dateBetweenEnd: dateBetweenEnd ? new Date(dateBetweenEnd) : null,
      postcodeArea: postcodeArea || null,
    };

    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-8 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Property Type */}
        <div>
          <label htmlFor="propertyType" className="block mb-2 text-sm font-semibold text-gray-700">Property Type</label>
          <select
            id="propertyType"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Property type"
          >
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Min Price (£)</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g., 300000"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Max Price (£)</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g., 1000000"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Min Bedrooms */}
        <div>
          <label htmlFor="minBeds" className="block mb-2 text-sm font-semibold text-gray-700">Min Bedrooms</label>
          <select
            id="minBeds"
            value={minBeds}
            onChange={(e) => setMinBeds(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Minimum bedrooms"
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Max Bedrooms */}
        <div>
          <label htmlFor="maxBeds" className="block mb-2 text-sm font-semibold text-gray-700">Max Bedrooms</label>
          <select
            id="maxBeds"
            value={maxBeds}
            onChange={(e) => setMaxBeds(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Maximum bedrooms"
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Date Added After */}
        <div>
          <label htmlFor="dateAfter" className="block mb-2 text-sm font-semibold text-gray-700">Added After</label>
          <input
            id="dateAfter"
            type="date"
            value={dateAfter}
            onChange={(e) => setDateAfter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Added after date"
            placeholder="Select start date"
          />
        </div>

        {/* Date Added Between - Start */}
        <div>
          <label htmlFor="dateBetweenStart" className="block mb-2 text-sm font-semibold text-gray-700">Added Between (Start)</label>
          <input
            id="dateBetweenStart"
            type="date"
            value={dateBetweenStart}
            onChange={(e) => setDateBetweenStart(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Added between start date"
            placeholder="Select start date"
          />
        </div>

        {/* Date Added Between - End */}
        <div>
          <label htmlFor="dateBetweenEnd" className="block mb-2 text-sm font-semibold text-gray-700">Added Between (End)</label>
          <input
            id="dateBetweenEnd"
            type="date"
            value={dateBetweenEnd}
            onChange={(e) => setDateBetweenEnd(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Added between end date"
            placeholder="Select end date"
          />
        </div>

        {/* Postcode Area */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Postcode Area (e.g., BR5, NW1)</label>
          <input
            type="text"
            value={postcodeArea}
            onChange={(e) => setPostcodeArea(e.target.value.toUpperCase())}
            placeholder="e.g., BR5"
            maxLength={4}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white transition bg-indigo-600 rounded hover:bg-indigo-700"
      >
        Search Properties
      </button>
    </form>
  );
};
