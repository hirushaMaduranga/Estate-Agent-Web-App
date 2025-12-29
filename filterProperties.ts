/**
 * Converts the JSON added date format { month, day, year } into a Date object
 * @param added - Object with month (string), day (number), year (number)
 * @returns Date object at start of day (00:00:00)
 */
export const parseAddedDate = (added: { month: string; day: number; year: number }): Date => {
  const monthMap: Record<string, number> = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };
  
  const monthIndex = monthMap[added.month];
  if (monthIndex === undefined) {
    throw new Error(`Invalid month: ${added.month}`);
  }
  
  return new Date(added.year, monthIndex, added.day, 0, 0, 0, 0);
};

export interface Property {
  id: string;
  type: string;
  bedrooms: number;
  price: number;
  tenure: string;
  description: string;
  location: string;
  picture: string;
  url: string;
  added: { month: string; day: number; year: number };
}

export interface FilterCriteria {
  type?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minBeds?: number | null;
  maxBeds?: number | null;
  dateAfter?: Date | null;
  dateBetweenStart?: Date | null;
  dateBetweenEnd?: Date | null;
  postcodeArea?: string | null;
}

/**
 * Filters a list of properties based on multiple optional criteria.
 * Returns results sorted by newest date added first.
 *
 * @param properties - Array of property objects
 * @param filters - Filter criteria (all fields optional, null/undefined = ignore)
 * @returns Filtered properties sorted by date (newest first)
 */
export const filterProperties = (
  properties: Property[],
  filters: FilterCriteria
): Property[] => {
  return properties
    .filter((property) => {
      // 1. Filter by type (case-insensitive, ignore if not provided)
      if (filters.type && filters.type !== "Any") {
        if (property.type.toLowerCase() !== filters.type.toLowerCase()) {
          return false;
        }
      }

      // 2. Filter by price range (min and/or max can be specified independently)
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

      // 3. Filter by bedrooms range (min and/or max can be specified independently)
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

      // 4. Filter by date added (supports "after" a date OR "between" two dates)
      const propertyDate = parseAddedDate(property.added);

      if (filters.dateAfter !== undefined && filters.dateAfter !== null) {
        if (propertyDate < filters.dateAfter) {
          return false;
        }
      }

      // Between two dates (both start and end required for this filter)
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
