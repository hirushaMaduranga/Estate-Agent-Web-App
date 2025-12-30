import React, { useState } from 'react';
import { FilterCriteria } from '../utils/filterProperties';

interface SearchFormProps {
  onSearch: (filters: FilterCriteria) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [type, setType] = useState<string>('Any');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minBeds, setMinBeds] = useState<number | ''>('');
  const [maxBeds, setMaxBeds] = useState<number | ''>('');
  const [dateAfter, setDateAfter] = useState<string>('');
  const [dateBetweenStart, setDateBetweenStart] = useState<string>('');
  const [dateBetweenEnd, setDateBetweenEnd] = useState<string>('');
  const [postcodeArea, setPostcodeArea] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filters: FilterCriteria = {
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Property Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Min Price (£)</label>
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
          <label className="block text-sm font-semibold mb-2 text-gray-700">Max Price (£)</label>
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
          <label className="block text-sm font-semibold mb-2 text-gray-700">Min Bedrooms</label>
          <select
            value={minBeds}
            onChange={(e) => setMinBeds(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <label className="block text-sm font-semibold mb-2 text-gray-700">Max Bedrooms</label>
          <select
            value={maxBeds}
            onChange={(e) => setMaxBeds(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <label className="block text-sm font-semibold mb-2 text-gray-700">Added After</label>
          <input
            type="date"
            value={dateAfter}
            onChange={(e) => setDateAfter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Date Added Between - Start */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Added Between (Start)</label>
          <input
            type="date"
            value={dateBetweenStart}
            onChange={(e) => setDateBetweenStart(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Date Added Between - End */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Added Between (End)</label>
          <input
            type="date"
            value={dateBetweenEnd}
            onChange={(e) => setDateBetweenEnd(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Postcode Area */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Postcode Area (e.g., BR5, NW1)</label>
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
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition"
      >
        Search Properties
      </button>
    </form>
  );
};
