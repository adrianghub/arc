import type { StationUIModel } from "../api/station";

/**
 * Filters and sorts stations based on a search term.
 * Only returns stations that start with the search term (in alphabetical order).
 */
export function filterStations(stations: StationUIModel[], searchTerm: string): StationUIModel[] {
  if (searchTerm.trim() === "") return stations;
  const lowerTerm = searchTerm.toLowerCase();

  return stations
    .filter(
      (station) =>
        station.name.toLowerCase().startsWith(lowerTerm) ||
        station.code.toLowerCase().startsWith(lowerTerm),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Gets the next character suggestion based on the first filtered station.
 * Used for ghost text suggestions.
 */
export function getNextCharSuggestion(
  filteredStations: StationUIModel[],
  searchTerm: string,
): string {
  if (filteredStations.length === 0 || searchTerm.trim() === "") {
    return "";
  }

  const firstStation = filteredStations[0];
  const firstStationName = firstStation.name.toLowerCase();
  const normalizedSearchTerm = searchTerm.toLowerCase();

  if (
    firstStationName.startsWith(normalizedSearchTerm) &&
    normalizedSearchTerm.length < firstStationName.length
  ) {
    return firstStationName.charAt(normalizedSearchTerm.length);
  }

  return "";
}

function isValidSpace(filteredStations: StationUIModel[], searchTerm: string): boolean {
  const normalizedSearchTerm = searchTerm.toLowerCase();

  return filteredStations.some((station) => {
    const stationName = station.name.toLowerCase();
    if (stationName.startsWith(normalizedSearchTerm)) {
      const remainingPart = stationName.slice(normalizedSearchTerm.length);
      return remainingPart.startsWith(" ") && remainingPart.length > 1;
    }
    return false;
  });
}

/**
 * Gets all available next characters from the filtered stations.
 * Used for the "Available next characters" section.
 */
export function getAvailableNextChars(
  filteredStations: StationUIModel[],
  searchTerm: string,
): string[] {
  if (filteredStations.length === 0 || searchTerm.trim() === "") {
    return [];
  }

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();
  const nextCharsSet = new Set<string>();

  const hasExactMatch = filteredStations.some(
    (station) =>
      station.name.toLowerCase().trim() === normalizedSearchTerm ||
      station.code.toLowerCase().trim() === normalizedSearchTerm,
  );

  if (hasExactMatch && filteredStations.length === 1) {
    return [];
  }

  // Only look at stations that start with the search term
  filteredStations.forEach((station) => {
    const name = station.name.toLowerCase();

    if (name.startsWith(normalizedSearchTerm) && normalizedSearchTerm.length < name.length) {
      nextCharsSet.add(name[normalizedSearchTerm.length]);
    }

    const code = station.code.toLowerCase();
    if (code.startsWith(normalizedSearchTerm) && normalizedSearchTerm.length < code.length) {
      nextCharsSet.add(code[normalizedSearchTerm.length]);
    }
  });

  if (nextCharsSet.has(" ") && !isValidSpace(filteredStations, searchTerm)) {
    nextCharsSet.delete(" ");
  }

  return Array.from(nextCharsSet).sort();
}
