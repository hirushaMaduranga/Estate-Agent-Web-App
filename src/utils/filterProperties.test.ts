import { filterProperties, parseAddedDate, Property } from '../utils/filterProperties';

describe('filterProperties', () => {
  const mockProperties: Property[] = [
    {
      id: 'prop1',
      type: 'House',
      bedrooms: 3,
      price: 750000,
      tenure: 'Freehold',
      description: 'Three bedroom house',
      location: 'Petts Wood Road, Petts Wood, Orpington BR5',
      picture: 'https://example.com/prop1.jpg',
      images: [],
      floorPlan: 'https://example.com/floorplan1.jpg',
      url: 'properties/prop1.html',
      added: { month: 'October', day: 12, year: 2022 }
    },
    {
      id: 'prop2',
      type: 'Flat',
      bedrooms: 2,
      price: 399995,
      tenure: 'Freehold',
      description: 'Two bedroom flat',
      location: 'Crofton Road Orpington BR6',
      picture: 'https://example.com/prop2.jpg',
      images: [],
      floorPlan: 'https://example.com/floorplan2.jpg',
      url: 'properties/prop2.html',
      added: { month: 'September', day: 14, year: 2022 }
    },
    {
      id: 'prop3',
      type: 'House',
      bedrooms: 4,
      price: 950000,
      tenure: 'Leasehold',
      description: 'Four bedroom house',
      location: 'Main Street London NW1',
      picture: 'https://example.com/prop3.jpg',
      images: [],
      floorPlan: 'https://example.com/floorplan3.jpg',
      url: 'properties/prop3.html',
      added: { month: 'November', day: 5, year: 2022 }
    },
  ];

  describe('parseAddedDate', () => {
    it('should correctly parse date from month string, day, and year', () => {
      const parsed = parseAddedDate({ month: 'October', day: 12, year: 2022 });
      expect(parsed.getFullYear()).toBe(2022);
      expect(parsed.getMonth()).toBe(9); // October is month 9 (0-indexed)
      expect(parsed.getDate()).toBe(12);
    });

    it('should throw error for invalid month', () => {
      expect(() => parseAddedDate({ month: 'InvalidMonth', day: 12, year: 2022 })).toThrow();
    });
  });

  describe('Filter by type', () => {
    it('should filter properties by type House', () => {
      const result = filterProperties(mockProperties, { type: 'House' });
      expect(result.length).toBe(2);
      expect(result.every((p) => p.type === 'House')).toBe(true);
    });

    it('should return all properties when type is Any', () => {
      const result = filterProperties(mockProperties, { type: 'Any' });
      expect(result.length).toBe(3);
    });

    it('should be case-insensitive for type filtering', () => {
      const result = filterProperties(mockProperties, { type: 'house' });
      expect(result.length).toBe(2);
    });
  });

  describe('Filter by price', () => {
    it('should filter by minimum price', () => {
      const result = filterProperties(mockProperties, { minPrice: 400000 });
      expect(result.length).toBe(2); // prop1 and prop3
      expect(result.some((p) => p.id === 'prop1')).toBe(true);
      expect(result.some((p) => p.id === 'prop3')).toBe(true);
    });

    it('should filter by maximum price', () => {
      const result = filterProperties(mockProperties, { maxPrice: 400000 });
      expect(result.length).toBe(1); // Only prop2 (399995)
      expect(result.some((p) => p.id === 'prop2')).toBe(true);
    });

    it('should filter by price range', () => {
      const result = filterProperties(mockProperties, { minPrice: 300000, maxPrice: 800000 });
      expect(result.length).toBe(2);
      expect(result.some((p) => p.id === 'prop1')).toBe(true);
      expect(result.some((p) => p.id === 'prop2')).toBe(true);
    });
  });

  describe('Filter by bedrooms', () => {
    it('should filter by minimum bedrooms', () => {
      const result = filterProperties(mockProperties, { minBeds: 3 });
      expect(result.length).toBe(2);
      expect(result.every((p) => p.bedrooms >= 3)).toBe(true);
    });

    it('should filter by maximum bedrooms', () => {
      const result = filterProperties(mockProperties, { maxBeds: 2 });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('prop2');
    });
  });

  describe('Filter by date', () => {
    it('should filter properties added after a date', () => {
      const dateAfter = new Date(2022, 9, 15); // October 15, 2022
      const result = filterProperties(mockProperties, { dateAfter });
      expect(result.length).toBe(1); // Only November property
      expect(result[0].id).toBe('prop3');
    });
  });

  describe('Filter by postcode', () => {
    it('should filter by postcode area case-insensitively', () => {
      const result = filterProperties(mockProperties, { postcodeArea: 'BR5' });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('prop1');
    });

    it('should match postcode case-insensitively with lowercase input', () => {
      const result = filterProperties(mockProperties, { postcodeArea: 'nw1' });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('prop3');
    });
  });

  describe('Combined filters', () => {
    it('should filter by type AND price', () => {
      const result = filterProperties(mockProperties, {
        type: 'House',
        minPrice: 700000
      });
      expect(result.length).toBe(2);
      expect(result.every((p) => p.type === 'House' && p.price >= 700000)).toBe(true);
    });

    it('should return empty array when no properties match criteria', () => {
      const result = filterProperties(mockProperties, {
        type: 'Flat',
        minPrice: 500000
      });
      expect(result.length).toBe(0);
    });
  });

  describe('Sorting', () => {
    it('should sort results by newest date added first', () => {
      const result = filterProperties(mockProperties, {});
      expect(result[0].id).toBe('prop3'); // November
      expect(result[1].id).toBe('prop1'); // October
      expect(result[2].id).toBe('prop2'); // September
    });
  });

  describe('Edge cases', () => {
    it('should return all properties when filters object is empty', () => {
      const result = filterProperties(mockProperties, {});
      expect(result.length).toBe(3);
    });

    it('should ignore null filter values', () => {
      const result = filterProperties(mockProperties, {
        type: 'House',
        minPrice: null,
        maxPrice: undefined
      });
      expect(result.length).toBe(2);
    });

    it('should handle postcode with whitespace', () => {
      const result = filterProperties(mockProperties, { postcodeArea: '  BR5  ' });
      expect(result.length).toBe(1);
    });
  });
});
