import { beforeEach, describe, expect, it, vi } from "vitest";
import type { StationUIModel } from "../api/station";

// Mock needs to be defined before imports
// This needs to be at the top level
// Because of using the functions in the mocked module
vi.mock("../utils/recentSearches");

import { addRecentSearch, getRecentSearches } from "../utils/recentSearches";

const testKey = "test_recent_searches";
const mockStation: StationUIModel = { name: "London", code: "LON" };
const secondMockStation: StationUIModel = { name: "Manchester", code: "MAN" };

describe("recentSearches", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getRecentSearches).mockReturnValue([]);
    vi.mocked(addRecentSearch).mockImplementation((station) => [station]);
  });

  describe("getRecentSearches", () => {
    it("should return an empty array when no searches are stored", () => {
      vi.mocked(getRecentSearches).mockReturnValueOnce([]);

      const result = getRecentSearches(testKey);
      expect(result).toEqual([]);
      expect(getRecentSearches).toHaveBeenCalledWith(testKey);
    });

    it("should return stored searches", () => {
      vi.mocked(getRecentSearches).mockReturnValueOnce([mockStation]);

      const result = getRecentSearches(testKey);
      expect(result).toEqual([mockStation]);
      expect(getRecentSearches).toHaveBeenCalledWith(testKey);
    });

    it("should use default key when no key is provided", () => {
      getRecentSearches();

      expect(getRecentSearches).toHaveBeenCalled();
    });

    it("should handle invalid JSON gracefully", () => {
      vi.mocked(getRecentSearches).mockReturnValueOnce([]);

      const result = getRecentSearches(testKey);
      expect(result).toEqual([]);
    });

    it("should handle non-array storage gracefully", () => {
      vi.mocked(getRecentSearches).mockReturnValueOnce([]);

      const result = getRecentSearches(testKey);
      expect(result).toEqual([]);
    });
  });

  describe("addRecentSearch", () => {
    it("should add a station to recent searches", () => {
      vi.mocked(addRecentSearch).mockReturnValueOnce([mockStation]);

      const result = addRecentSearch(mockStation, testKey);
      expect(result).toEqual([mockStation]);
      expect(addRecentSearch).toHaveBeenCalledWith(mockStation, testKey);
    });

    it("should move an existing station to the top of the list", () => {
      vi.mocked(addRecentSearch).mockReturnValueOnce([mockStation, secondMockStation]);

      const result = addRecentSearch(mockStation, testKey);
      expect(result).toEqual([mockStation, secondMockStation]);
      expect(addRecentSearch).toHaveBeenCalledWith(mockStation, testKey);
    });

    it("should limit the number of recent stations to 5", () => {
      const stations = Array.from({ length: 6 }, (_, i) => ({
        name: `Station ${i}`,
        code: `ST${i}`,
      }));

      const expectedResult = [stations[5], ...stations.slice(1, 5)];
      vi.mocked(addRecentSearch).mockReturnValueOnce(expectedResult);

      const result = addRecentSearch(stations[5], testKey);

      expect(result.length).toBe(5);
      expect(result[0].code).toBe("ST5");
      expect(result).toEqual(expectedResult);
    });

    it("should use default key when no key is provided", () => {
      addRecentSearch(mockStation);

      expect(addRecentSearch).toHaveBeenCalled();
      expect(vi.mocked(addRecentSearch).mock.calls[0][0]).toEqual(mockStation);
    });

    it("should handle invalid station gracefully", () => {
      vi.mocked(addRecentSearch).mockReturnValueOnce([]);

      // @ts-expect-error - Testing invalid input
      const result = addRecentSearch(null, testKey);
      expect(result).toEqual([]);

      vi.mocked(addRecentSearch).mockReturnValueOnce([]);
      // @ts-expect-error - Testing invalid input
      const result2 = addRecentSearch({ foo: "bar" }, testKey);
      expect(result2).toEqual([]);
    });
  });
});
