import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { InputField } from './InputField';

import 'react-datepicker/dist/react-datepicker.css';

export const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBeds, setMinBeds] = useState('');
  const [maxBeds, setMaxBeds] = useState('');
  const [dateMode, setDateMode] = useState('after'); // 'after' or 'between'
  const [dateAfter, setDateAfter] = useState(null);
  const [dateBetweenStart, setDateBetweenStart] = useState(null);
  const [dateBetweenEnd, setDateBetweenEnd] = useState(null);
  const [postcodeArea, setPostcodeArea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      type: type ? type.value : null,
      minPrice: minPrice !== '' ? Number(minPrice) : null,
      maxPrice: maxPrice !== '' ? Number(maxPrice) : null,
      minBeds: minBeds !== '' ? Number(minBeds) : null,
      maxBeds: maxBeds !== '' ? Number(maxBeds) : null,
      dateAfter: dateMode === 'after' ? dateAfter : null,
      dateBetweenStart: dateMode === 'between' ? dateBetweenStart : null,
      dateBetweenEnd: dateMode === 'between' ? dateBetweenEnd : null,
      postcodeArea: postcodeArea || null,
    };

    onSearch(filters);
  };

  // Property type options for react-select
  const typeOptions = [
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' },
  ];

  // Bedroom options for numeric selects
  const bedroomOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-8 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Property Type - React Select Widget */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Property Type</label>
          <Select
            inputId="propertyType"
            options={typeOptions}
            value={type}
            onChange={setType}
            isClearable
            placeholder="Select type..."
            classNamePrefix="react-select"
            aria-label="Property type"
          />
        </div>

        {/* Min Price - InputField Component */}
        <InputField
          label="Min Price (£)"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="e.g., 300000"
        />

        {/* Max Price - InputField Component */}
        <InputField
          label="Max Price (£)"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="e.g., 1000000"
        />

        {/* Min Bedrooms - InputField Component */}
        <InputField
          label="Min Bedrooms"
          type="number"
          value={minBeds}
          onChange={(e) => setMinBeds(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="Any"
          min="0"
        />

        {/* Max Bedrooms - InputField Component */}
        <InputField
          label="Max Bedrooms"
          type="number"
          value={maxBeds}
          onChange={(e) => setMaxBeds(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="Any"
          min="0"
        />

        {/* Date Filter Mode Toggle */}
        <div className="lg:col-span-3">
          <fieldset className="border border-gray-300 rounded p-4">
            <legend className="text-sm font-semibold text-gray-700 px-2">Filter by Date Added</legend>
            <div className="flex gap-6 mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateMode"
                  value="after"
                  checked={dateMode === 'after'}
                  onChange={(e) => setDateMode(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">After a date</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateMode"
                  value="between"
                  checked={dateMode === 'between'}
                  onChange={(e) => setDateMode(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Between dates</span>
              </label>
            </div>
          </fieldset>
        </div>

        {/* Date Added After - React DatePicker Widget (shown in 'after' mode) */}
        {dateMode === 'after' && (
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Added After</label>
            <DatePicker
              selected={dateAfter}
              onChange={(date) => setDateAfter(date)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholderText="Select a date"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}

        {/* Date Added Between - Start - React DatePicker Widget (shown in 'between' mode) */}
        {dateMode === 'between' && (
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Added Between (Start)</label>
            <DatePicker
              selected={dateBetweenStart}
              onChange={(date) => setDateBetweenStart(date)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholderText="Select start date"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}

        {/* Date Added Between - End - React DatePicker Widget (shown in 'between' mode) */}
        {dateMode === 'between' && (
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Added Between (End)</label>
            <DatePicker
              selected={dateBetweenEnd}
              onChange={(date) => setDateBetweenEnd(date)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholderText="Select end date"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}

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
