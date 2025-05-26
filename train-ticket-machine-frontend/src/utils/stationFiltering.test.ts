import { describe, expect, it } from "vitest";
import type { StationUIModel } from "../api/station";
import { filterStations, getAvailableNextChars, getNextCharSuggestion } from "./stationFiltering";

const mockStations: StationUIModel[] = [
  { name: "London", code: "LON" },
  { name: "Birmingham", code: "BHM" },
  { name: "New York", code: "NYK" },
  { name: "Long Island", code: "LGI" },
  { name: "Liverpool", code: "LIV" },
  { name: "Leeds", code: "LDS" },
  { name: "Manchester", code: "MAN" },
  { name: "Wilson", code: "WIL" },
];

describe("filterStations", () => {
  it("should return all stations when search term is empty", () => {
    const result = filterStations(mockStations, "");
    expect(result).toEqual(mockStations);
  });

  it("should return stations that start with the search term", () => {
    const result = filterStations(mockStations, "L");
    expect(result.length).toBe(4);
    expect(result[0].name).toBe("Leeds");
    expect(result[1].name).toBe("Liverpool");
    expect(result[2].name).toBe("London");
    expect(result[3].name).toBe("Long Island");
  });

  it("should not match stations with search term in middle", () => {
    const result = filterStations(mockStations, "on");
    expect(result.length).toBe(0);
  });

  it("should match case insensitively", () => {
    const result = filterStations(mockStations, "lON");
    expect(result.length).toBe(2);
    expect(result[0].name).toBe("London");
    expect(result[1].name).toBe("Long Island");
  });

  it("should match by station code", () => {
    const result = filterStations(mockStations, "MAN");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Manchester");
  });

  it("should only match start of station codes", () => {
    const result = filterStations(mockStations, "AN");
    expect(result.length).toBe(0);
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

  it("should have sorted next characters", () => {
    const filtered = filterStations(mockStations, "L");
    const result = getAvailableNextChars(filtered, "L");
    expect(result.join("")).toBe(result.sort().join(""));
  });

  it("should include space as an available next character when appropriate", () => {
    const filtered = filterStations(mockStations, "New");
    const result = getAvailableNextChars(filtered, "New");
    expect(result).toContain(" ");
  });

  it("should not include space if search term is at the end of a word", () => {
    const filtered = filterStations(mockStations, "London");
    const result = getAvailableNextChars(filtered, "London");
    expect(result).not.toContain(" ");
  });

  it("should return empty array for exact match with single result", () => {
    const singleMatch = [{ name: "London", code: "LON" }];
    const result = getAvailableNextChars(singleMatch, "London");
    expect(result).toEqual([]);
  });

  it("should include next characters from station codes", () => {
    const filtered = filterStations(mockStations, "LO");
    const result = getAvailableNextChars(filtered, "LO");
    expect(result).toContain("n");
  });

  it("should not show next characters for exact match when multiple results exist", () => {
    const stations = [
      { name: "Aber", code: "ABE" },
      { name: "Aberdeen", code: "ABD" },
    ];
    const result = getAvailableNextChars(stations, "Aber");
    expect(result).toContain("d");
  });
});
