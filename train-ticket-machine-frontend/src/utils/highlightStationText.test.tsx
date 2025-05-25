import React from "react";
import { describe, expect, it } from "vitest";
import { highlightStationText } from "./highlightStationText";

describe("highlightStationText", () => {
  it("should return the original text when search term is empty", () => {
    const station = "London";
    const result = highlightStationText(station, "");
    expect(result).toBe(station);
  });

  it("should return the original text when station name is empty", () => {
    const result = highlightStationText("", "London");
    expect(result).toBe("");
  });

  it("should return the original text when search term is not found", () => {
    const station = "London";
    const result = highlightStationText(station, "xyz");
    expect(result).toBe(station);
  });

  it("should return the original text when search term is at the end", () => {
    const station = "London";
    const result = highlightStationText(station, "don");
    expect(result).toBe(station);
  });

  it("should highlight the next character after the search term", () => {
    const station = "London";
    const searchTerm = "Lo";

    const result = highlightStationText(station, searchTerm);

    expect(React.isValidElement(result)).toBe(true);

    if (typeof result === "object") {
      expect(result).not.toBeNull();
      // @ts-expect-error - Checking React element type
      expect(result.type).toBe("span");

      // @ts-expect-error - Checking React element props
      expect(result.props.children).toBeDefined();
    }
  });

  it("should handle case insensitivity", () => {
    const station = "London";
    const searchTerm = "lo";

    const result = highlightStationText(station, searchTerm);

    expect(React.isValidElement(result)).toBe(true);
  });
});
