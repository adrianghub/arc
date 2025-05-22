import { useEffect, useState } from "react";

interface UseStationSuggestionsProps {
  stations: string[];
  searchTerm: string;
}

interface UseStationSuggestionsResult {
  filteredStations: string[];
  nextCharSuggestion: string;
  availableNextChars: string[];
}

export function useStationSuggestions({
  stations,
  searchTerm,
}: UseStationSuggestionsProps): UseStationSuggestionsResult {
  const [filteredStations, setFilteredStations] = useState<string[]>(stations);
  const [nextCharSuggestion, setNextCharSuggestion] = useState<string>("");
  const [availableNextChars, setAvailableNextChars] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStations(stations);
      setNextCharSuggestion("");
      setAvailableNextChars([]);
    } else {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      const filtered = stations.filter((station) =>
        station.toLowerCase().includes(normalizedSearchTerm),
      );
      setFilteredStations(filtered);

      // Find the most likely next character and available next chars
      calculateNextCharacters(filtered, normalizedSearchTerm);
    }
  }, [searchTerm, stations]);

  // Calculate next characters from filtered stations
  const calculateNextCharacters = (filtered: string[], search: string) => {
    if (filtered.length === 0 || search.length === 0) {
      setNextCharSuggestion("");
      setAvailableNextChars([]);
      return;
    }

    // Find all possible next characters
    const nextCharsMap = new Map<string, number>();

    // Find characters that continue existing patterns (e.g., if search is "g" and there's "gg", prioritize "g")
    const searchPattern = search.toLowerCase();
    const continuationPattern = new Map<string, number>();

    filtered.forEach((station) => {
      const lowerStation = station.toLowerCase();
      // Find all occurrences of the search term in the station name
      let index = lowerStation.indexOf(searchPattern);
      while (index !== -1) {
        // Check if there's a character after the search term
        if (index + searchPattern.length < lowerStation.length) {
          const nextChar = station[index + searchPattern.length];
          // Only add meaningful characters (ignore spaces, special chars, etc.)
          if (/^[a-zA-Z0-9]$/.test(nextChar)) {
            nextCharsMap.set(nextChar, (nextCharsMap.get(nextChar) || 0) + 1);

            // Check if this character continues an existing pattern
            if (searchPattern.endsWith(nextChar.toLowerCase())) {
              continuationPattern.set(nextChar, (continuationPattern.get(nextChar) || 0) + 5); // Give extra weight
            } else if (lowerStation.indexOf(searchPattern + nextChar.toLowerCase()) >= 0) {
              continuationPattern.set(nextChar, (continuationPattern.get(nextChar) || 0) + 3); // Give some weight
            }
          }
        }
        // Find next occurrence
        index = lowerStation.indexOf(searchPattern, index + 1);
      }
    });

    // Sort next characters giving priority to characters that continue patterns
    const sortedNextChars = Array.from(nextCharsMap.entries())
      .sort((a, b) => {
        const aBoost = continuationPattern.get(a[0]) || 0;
        const bBoost = continuationPattern.get(b[0]) || 0;

        // If same character as last character in search, prioritize highest
        const aRepeat = searchPattern.endsWith(a[0].toLowerCase()) ? 10 : 0;
        const bRepeat = searchPattern.endsWith(b[0].toLowerCase()) ? 10 : 0;

        // Sort by repeat + boost + frequency
        return bRepeat + bBoost + b[1] - (aRepeat + aBoost + a[1]);
      })
      .map((entry) => entry[0]);

    setAvailableNextChars(sortedNextChars);
    setNextCharSuggestion(sortedNextChars[0] || "");
  };

  return {
    filteredStations,
    nextCharSuggestion,
    availableNextChars,
  };
}
