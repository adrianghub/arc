import { describe, expect, it } from "vitest";
import type { StationUIModel } from "../api/station";
import {
  getStationListData,
  shouldShowContent,
  shouldShowNoResultsMessage,
} from "./stationListHelpers";

const mockStations: StationUIModel[] = [
  { name: "London", code: "LON" },
  { name: "Birmingham", code: "BHM" },
  { name: "Manchester", code: "MAN" },
  { name: "Liverpool", code: "LIV" },
  { name: "Leeds", code: "LDS" },
];

const mockRecentStations: StationUIModel[] = [
  { name: "London", code: "LON" },
  { name: "Manchester", code: "MAN" },
];

describe("getStationListData", () => {
  it("should show recent searches when search term is empty and dropdown is open", () => {
    const result = getStationListData("", true, mockRecentStations, [], mockStations);

    expect(result.showRecentLayout).toBe(true);
    expect(result.displayStations.length).toBe(5);
    expect(result.displayStations[0].code).toBe("LON");
    expect(result.displayStations[1].code).toBe("MAN");
  });

  it("should not show recent layout when search term is not empty", () => {
    const result = getStationListData(
      "L",
      true,
      mockRecentStations,
      mockStations.filter((s) => s.name.includes("L")),
      mockStations,
    );

    expect(result.showRecentLayout).toBe(false);
    expect(result.displayStations.length).toBe(3); // London, Liverpool, Leeds
  });

  it("should exclude selected station from stations to render", () => {
    const selectedStation = mockStations[0]; // London
    const result = getStationListData(
      "",
      true,
      mockRecentStations,
      [],
      mockStations,
      selectedStation,
    );

    expect(result.stationsToRender.length).toBe(4);
    expect(result.stationsToRender.find((s) => s.code === "LON")).toBeUndefined();
  });

  it("should handle empty recent searches", () => {
    const result = getStationListData("", true, [], mockStations, mockStations);

    expect(result.showRecentLayout).toBe(false);
    // When there are no recent searches but there is a search term, display stations should be filteredStations
    expect(result.displayStations).toEqual(mockStations);
  });
});

describe("shouldShowNoResultsMessage", () => {
  it("should return true when no stations match search term", () => {
    const stationsToRender: StationUIModel[] = [];
    const result = shouldShowNoResultsMessage(stationsToRender, "xyz");

    expect(result).toBe(true);
  });

  it("should return false when search term is empty", () => {
    const stationsToRender: StationUIModel[] = [];
    const result = shouldShowNoResultsMessage(stationsToRender, "");

    expect(result).toBe(false);
  });

  it("should return false when stations match search term", () => {
    const stationsToRender = mockStations.filter((s) => s.name.includes("L"));
    const result = shouldShowNoResultsMessage(stationsToRender, "L");

    expect(result).toBe(false);
  });
});

describe("shouldShowContent", () => {
  it("should return true when stations match search term", () => {
    const stationsToRender = mockStations.filter((s) => s.name.includes("L"));
    const result = shouldShowContent(stationsToRender, "L", mockStations);

    expect(result).toBe(true);
  });

  it("should return false when no stations match empty search term", () => {
    const stationsToRender: StationUIModel[] = [];
    const result = shouldShowContent(stationsToRender, "", mockStations);

    expect(result).toBe(false);
  });

  it("should return true when no stations match non-empty search term", () => {
    const stationsToRender: StationUIModel[] = [];
    const result = shouldShowContent(stationsToRender, "xyz", mockStations);

    expect(result).toBe(true);
  });
});
