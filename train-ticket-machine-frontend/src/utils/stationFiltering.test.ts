import { describe, expect, it } from "vitest";
import type { StationUIModel } from "../api/station";
import { filterStations, getAvailableNextChars, getNextCharSuggestion } from "./stationFiltering";

const mockStations: StationUIModel[] = [
  { name: "London", code: "LON" },
  { name: "Birmingham", code: "BHM" },
  { name: "Manchester", code: "MAN" },
  { name: "Liverpool", code: "LIV" },
  { name: "Leeds", code: "LDS" },
];

describe("filterStations", () => {
  it("should return all stations when search term is empty", () => {
    const result = filterStations(mockStations, "");
    expect(result).toEqual(mockStations);
  });

  it("should return stations that start with the search term first", () => {
    const result = filterStations(mockStations, "L");
    expect(result.length).toBe(3);
    expect(result[0].name).toBe("Leeds");
    expect(result[1].name).toBe("Liverpool");
    expect(result[2].name).toBe("London");
  });

  it("should match stations with search term in middle", () => {
    const result = filterStations(mockStations, "on");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("London");
  });

  it("should match case insensitively", () => {
    const result = filterStations(mockStations, "lON");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("London");
  });

  it("should match by station code", () => {
    const result = filterStations(mockStations, "MAN");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Manchester");
  });
});

describe("getNextCharSuggestion", () => {
  it("should return empty string when no stations match", () => {
    const result = getNextCharSuggestion([], "xyz");
    expect(result).toBe("");
  });

  it("should return empty string when search term is empty", () => {
    const result = getNextCharSuggestion(mockStations, "");
    expect(result).toBe("");
  });

  it("should return the next character from the first matching station", () => {
    const filtered = filterStations(mockStations, "L");
    const result = getNextCharSuggestion(filtered, "L");
    expect(result).toBe("e");
  });

  it("should return empty string if search term is longer than station name", () => {
    const result = getNextCharSuggestion(mockStations, "London Bridge");
    expect(result).toBe("");
  });
});

describe("getAvailableNextChars", () => {
  it("should return empty array when no stations match", () => {
    const result = getAvailableNextChars([], "xyz");
    expect(result).toEqual([]);
  });

  it("should return empty array when search term is empty", () => {
    const result = getAvailableNextChars(mockStations, "");
    expect(result).toEqual([]);
  });

  it("should return unique next characters from matching stations", () => {
    const filtered = filterStations(mockStations, "L");
    const result = getAvailableNextChars(filtered, "L");
    expect(result).toContain("e");
    expect(result).toContain("i");
    expect(result).toContain("o");
  });

  it("should prioritize the primary next character", () => {
    const filtered = filterStations(mockStations, "L");
    const result = getAvailableNextChars(filtered, "L");
    expect(result[0]).toBe("e");
  });
});
