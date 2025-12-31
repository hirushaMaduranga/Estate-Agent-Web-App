import React from 'react';

/**
 * Reusable input field component for consistent styling across search form
 * Used for numeric inputs (price, bedrooms)
 */
export const InputField = ({
  label,
  type = 'number',
  value,
  onChange,
  placeholder,
  min,
  max,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};
