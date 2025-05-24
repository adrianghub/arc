import { useEffect, useState } from "react";
import type { StationUIModel } from "../api/station";
import {
  filterStations,
  getAvailableNextChars,
  getNextCharSuggestion,
} from "../utils/stationFiltering";

interface UseStationItemsProps {
  stations: StationUIModel[];
  searchTerm: string;
}

interface UseStationItemsResult {
  filteredStations: StationUIModel[];
  nextCharSuggestion: string;
  availableNextChars: string[];
}

export function useStationItems({
  stations,
  searchTerm,
}: UseStationItemsProps): UseStationItemsResult {
  const [filteredStations, setFilteredStations] = useState<StationUIModel[]>(stations);
  const [nextCharSuggestion, setNextCharSuggestion] = useState<string>("");
  const [availableNextChars, setAvailableNextChars] = useState<string[]>([]);

  useEffect(() => {
    const filtered = filterStations(stations, searchTerm);
    setFilteredStations(filtered);

    if (searchTerm.trim() === "") {
      setNextCharSuggestion("");
      setAvailableNextChars([]);
    } else {
      const suggestion = getNextCharSuggestion(filtered, searchTerm);
      setNextCharSuggestion(suggestion);

      const nextChars = getAvailableNextChars(filtered, searchTerm);
      setAvailableNextChars(nextChars);
    }
  }, [searchTerm, stations]);

  return {
    filteredStations,
    nextCharSuggestion,
    availableNextChars,
  };
}
