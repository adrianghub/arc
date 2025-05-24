import type { StationUIModel } from "../api/station";

/**
 * Filters and sorts stations based on a search term.
 * Stations starting with the search term appear first (in alphabetical order),
 * followed by stations containing the search term elsewhere (also in alphabetical order).
 */
export function filterStations(stations: StationUIModel[], searchTerm: string): StationUIModel[] {
  if (searchTerm.trim() === "") return stations;
  const lowerTerm = searchTerm.toLowerCase();

  const startsWithMatches = stations
    .filter(
      (station) =>
        station.name.toLowerCase().startsWith(lowerTerm) ||
        station.code.toLowerCase().startsWith(lowerTerm),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const containsMatches = stations
    .filter(
      (station) =>
        (station.name.toLowerCase().includes(lowerTerm) ||
          station.code.toLowerCase().includes(lowerTerm)) &&
        !station.name.toLowerCase().startsWith(lowerTerm) &&
        !station.code.toLowerCase().startsWith(lowerTerm),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...startsWithMatches, ...containsMatches];
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

  const normalizedSearchTerm = searchTerm.toLowerCase();
  const nextCharsSet = new Set<string>();

  const primaryNextChar = getNextCharSuggestion(filteredStations, searchTerm);
  if (primaryNextChar) {
    nextCharsSet.add(primaryNextChar);
  }

  filteredStations.forEach((station) => {
    const searchableText = `${station.name} ${station.code}`.toLowerCase();

    let index = searchableText.indexOf(normalizedSearchTerm);
    while (index !== -1) {
      if (index + normalizedSearchTerm.length < searchableText.length) {
        const nextChar = searchableText[index + normalizedSearchTerm.length];
        if (/^[a-zA-Z0-9]$/.test(nextChar)) {
          nextCharsSet.add(nextChar);
        }
      }
      index = searchableText.indexOf(normalizedSearchTerm, index + 1);
    }
  });

  const result = Array.from(nextCharsSet);
  if (primaryNextChar && result.includes(primaryNextChar)) {
    result.splice(result.indexOf(primaryNextChar), 1);
    result.unshift(primaryNextChar);
  }

  return result;
}
