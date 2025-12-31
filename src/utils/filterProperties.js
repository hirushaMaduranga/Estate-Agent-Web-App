/**
 * Converts the JSON added date format { month, day, year } into a Date object
 */
export const parseAddedDate = (added) => {
  const monthMap = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };
  
  const monthIndex = monthMap[added.month];
  if (monthIndex === undefined) {
    throw new Error(`Invalid month: ${added.month}`);
  }
  
  return new Date(added.year, monthIndex, added.day, 0, 0, 0, 0);
};

/**
 * Filters a list of properties based on multiple optional criteria.
 * Returns results sorted by newest date added first.
 */
export const filterProperties = (properties, filters) => {
  return properties
    .filter((property) => {
      // 1. Filter by type (case-insensitive, ignore if not provided)
      if (filters.type && filters.type !== "Any") {
        if (property.type.toLowerCase() !== filters.type.toLowerCase()) {
          return false;
        }
      }

      // 2. Filter by price range
      if (filters.minPrice !== undefined && filters.minPrice !== null) {
        if (property.price < filters.minPrice) {
          return false;
        }
      }
      if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
        if (property.price > filters.maxPrice) {
          return false;
        }
      }

      // 3. Filter by bedrooms range
      if (filters.minBeds !== undefined && filters.minBeds !== null) {
        if (property.bedrooms < filters.minBeds) {
          return false;
        }
      }
      if (filters.maxBeds !== undefined && filters.maxBeds !== null) {
        if (property.bedrooms > filters.maxBeds) {
          return false;
        }
      }

      // 4. Filter by date added
      const propertyDate = parseAddedDate(property.added);

      if (filters.dateAfter !== undefined && filters.dateAfter !== null) {
        if (propertyDate < filters.dateAfter) {
          return false;
        }
      }

      if (
        filters.dateBetweenStart !== undefined &&
        filters.dateBetweenStart !== null &&
        filters.dateBetweenEnd !== undefined &&
        filters.dateBetweenEnd !== null
      ) {
        if (propertyDate < filters.dateBetweenStart || propertyDate > filters.dateBetweenEnd) {
          return false;
        }
      }

      // 5. Filter by postcode area (case-insensitive)
      if (filters.postcodeArea) {
        const trimmedPostcode = filters.postcodeArea.trim();
        if (trimmedPostcode) {
          const locationParts = property.location.split(" ");
          const locationPostcode = locationParts[locationParts.length - 1];
          if (locationPostcode.toUpperCase() !== trimmedPostcode.toUpperCase()) {
            return false;
          }
        }
      }

      return true;
    })
    // Sort by newest date first
    .sort((a, b) => parseAddedDate(b.added).getTime() - parseAddedDate(a.added).getTime());
};
