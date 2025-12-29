import { filterProperties, parseAddedDate, Property } from "./filterProperties";

describe("filterProperties", () => {
  const mockProperties: Property[] = [
    {
      id: "prop1",
      type: "House",
      bedrooms: 3,
      price: 750000,
      tenure: "Freehold",
      description: "Three bedroom house",
      location: "Petts Wood Road, Petts Wood, Orpington BR5",
      picture: "images/prop1pic1small.jpg",
      url: "properties/prop1.html",
      added: { month: "October", day: 12, year: 2022 }
    },
    {
      id: "prop2",
      type: "Flat",
      bedrooms: 2,
      price: 399995,
      tenure: "Freehold",
      description: "Two bedroom flat",
      location: "Crofton Road Orpington BR6",
      picture: "images/prop2pic1small.jpg",
      url: "properties/prop2.html",
      added: { month: "September", day: 14, year: 2022 }
    },
    {
      id: "prop3",
      type: "House",
      bedrooms: 4,
      price: 950000,
      tenure: "Leasehold",
      description: "Four bedroom house",
      location: "Main Street London NW1",
      picture: "images/prop3pic1small.jpg",
      url: "properties/prop3.html",
      added: { month: "November", day: 5, year: 2022 }
    },
    {
      id: "prop4",
      type: "Flat",
      bedrooms: 1,
      price: 299000,
      tenure: "Freehold",
      description: "One bedroom flat",
      location: "High Street BR5",
      picture: "images/prop4pic1small.jpg",
      url: "properties/prop4.html",
      added: { month: "December", day: 1, year: 2022 }
    }
  ];

  describe("parseAddedDate helper", () => {
    it("should correctly parse a date string format to Date object", () => {
      const parsed = parseAddedDate({ month: "October", day: 12, year: 2022 });
      expect(parsed.getFullYear()).toBe(2022);
      expect(parsed.getMonth()).toBe(9); // October is month 9 (0-indexed)
      expect(parsed.getDate()).toBe(12);
    });
  });

  describe("Filter by type only", () => {
    it("should return only House type properties", () => {
      const result = filterProperties(mockProperties, { type: "House" });
      expect(result.length).toBe(2);
      expect(result.every((p) => p.type === "House")).toBe(true);
      expect(result[0].id).toBe("prop3"); // Newest first (November > October)
      expect(result[1].id).toBe("prop1");
    });

    it("should return only Flat type properties", () => {
      const result = filterProperties(mockProperties, { type: "Flat" });
      expect(result.length).toBe(2);
      expect(result.every((p) => p.type === "Flat")).toBe(true);
    });

    it("should be case-insensitive for type filtering", () => {
      const result = filterProperties(mockProperties, { type: "house" });
      expect(result.length).toBe(2);
    });

    it("should return all properties when type is 'Any'", () => {
      const result = filterProperties(mockProperties, { type: "Any" });
      expect(result.length).toBe(4);
    });
  });

  describe("Filter by price only", () => {
    it("should filter by minimum price", () => {
      const result = filterProperties(mockProperties, { minPrice: 400000 });
      expect(result.length).toBe(2);
      expect(result.some((p) => p.id === "prop1")).toBe(true); // 750000
      expect(result.some((p) => p.id === "prop3")).toBe(true); // 950000
    });

    it("should filter by maximum price", () => {
      const result = filterProperties(mockProperties, { maxPrice: 400000 });
      expect(result.length).toBe(2);
      expect(result.some((p) => p.id === "prop2")).toBe(true); // 399995
      expect(result.some((p) => p.id === "prop4")).toBe(true); // 299000
    });

    it("should filter by price range (min and max)", () => {
      const result = filterProperties(mockProperties, { minPrice: 300000, maxPrice: 800000 });
      expect(result.length).toBe(2);
      expect(result.some((p) => p.id === "prop1")).toBe(true); // 750000 ✓
      expect(result.some((p) => p.id === "prop2")).toBe(true); // 399995 ✓
      expect(result.some((p) => p.id === "prop3")).toBe(false); // 950000 ✗ (over max)
    });
  });

  describe("Filter by bedrooms only", () => {
    it("should filter by minimum bedrooms", () => {
      const result = filterProperties(mockProperties, { minBeds: 3 });
      expect(result.length).toBe(2);
      expect(result.some((p) => p.id === "prop1")).toBe(true); // 3 beds
      expect(result.some((p) => p.id === "prop3")).toBe(true); // 4 beds
    });

    it("should filter by maximum bedrooms", () => {
      const result = filterProperties(mockProperties, { maxBeds: 2 });
      expect(result.length).toBe(2);
      expect(result.some((p) => p.id === "prop2")).toBe(true); // 2 beds
      expect(result.some((p) => p.id === "prop4")).toBe(true); // 1 bed
    });

    it("should filter by bedroom range", () => {
      const result = filterProperties(mockProperties, { minBeds: 2, maxBeds: 3 });
      expect(result.length).toBe(2);
      expect(result.some((p) => p.id === "prop1")).toBe(true); // 3 beds ✓
      expect(result.some((p) => p.id === "prop2")).toBe(true); // 2 beds ✓
    });
  });

  describe("Filter by date added", () => {
    it("should filter properties added after a specific date", () => {
      const dateAfter = new Date(2022, 9, 15); // October 15, 2022
      const result = filterProperties(mockProperties, { dateAfter });
      expect(result.length).toBe(2); // prop3 (Nov) and prop4 (Dec)
      expect(result[0].id).toBe("prop4"); // Newest first (December)
      expect(result[1].id).toBe("prop3"); // November
    });

    it("should filter properties between two dates", () => {
      const dateBetweenStart = new Date(2022, 8, 1); // September 1, 2022
      const dateBetweenEnd = new Date(2022, 9, 31); // October 31, 2022
      const result = filterProperties(mockProperties, {
        dateBetweenStart,
        dateBetweenEnd
      });
      expect(result.length).toBe(2); // prop1 (Oct) and prop2 (Sept)
      expect(result.some((p) => p.id === "prop1")).toBe(true);
      expect(result.some((p) => p.id === "prop2")).toBe(true);
    });
  });

  describe("Filter by postcode area", () => {
    it("should filter by postcode area case-insensitively", () => {
      const result = filterProperties(mockProperties, { postcodeArea: "BR5" });
      expect(result.length).toBe(2);
      expect(result.some((p) => p.id === "prop1")).toBe(true); // BR5
      expect(result.some((p) => p.id === "prop4")).toBe(true); // BR5
    });

    it("should match postcode case-insensitively (lowercase input)", () => {
      const result = filterProperties(mockProperties, { postcodeArea: "nw1" });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe("prop3"); // NW1
    });

    it("should not match partial postcode", () => {
      const result = filterProperties(mockProperties, { postcodeArea: "BR" });
      expect(result.length).toBe(0); // No exact match
    });
  });

  describe("Combined filters (multiple criteria)", () => {
    it("should filter by type AND price", () => {
      const result = filterProperties(mockProperties, {
        type: "House",
        minPrice: 700000
      });
      expect(result.length).toBe(2); // prop1 (750000) and prop3 (950000)
      expect(result.some((p) => p.id === "prop1")).toBe(true); // House, price 750000
      expect(result.some((p) => p.id === "prop3")).toBe(true); // House, price 950000
    });

    it("should filter by type AND bedrooms AND price", () => {
      const result = filterProperties(mockProperties, {
        type: "Flat",
        minBeds: 2,
        maxPrice: 400000
      });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe("prop2"); // Flat, 2 beds, price 399995
    });

    it("should filter by all criteria combined", () => {
      const result = filterProperties(mockProperties, {
        type: "House",
        minPrice: 700000,
        maxPrice: 800000,
        minBeds: 3,
        postcodeArea: "BR5",
        dateAfter: new Date(2022, 8, 1) // September 1, 2022
      });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe("prop1");
    });

    it("should return empty array when no properties match combined criteria", () => {
      const result = filterProperties(mockProperties, {
        type: "House",
        maxPrice: 100000 // Too low
      });
      expect(result.length).toBe(0);
    });
  });

  describe("Edge cases", () => {
    it("should return all properties when filters object is empty", () => {
      const result = filterProperties(mockProperties, {});
      expect(result.length).toBe(4);
    });

    it("should ignore null/undefined filter values", () => {
      const result = filterProperties(mockProperties, {
        type: "House",
        minPrice: null,
        maxPrice: undefined,
        minBeds: null
      });
      expect(result.length).toBe(2); // Both houses
    });

    it("should sort results by newest date first", () => {
      const result = filterProperties(mockProperties, {});
      expect(result[0].id).toBe("prop4"); // December 1, 2022
      expect(result[1].id).toBe("prop3"); // November 5, 2022
      expect(result[2].id).toBe("prop1"); // October 12, 2022
      expect(result[3].id).toBe("prop2"); // September 14, 2022
    });

    it("should handle postcode with whitespace", () => {
      const result = filterProperties(mockProperties, { postcodeArea: "  BR5  " });
      expect(result.length).toBe(2); // Should trim and match
      expect(result.some((p) => p.id === "prop1")).toBe(true);
      expect(result.some((p) => p.id === "prop4")).toBe(true);
    });
  });
});
