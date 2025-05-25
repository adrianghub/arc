import type { StationUIModel } from "../api/station";
import { addRecentSearch } from "../utils/recentSearches";
import {
  filterStations,
  getAvailableNextChars,
  getNextCharSuggestion,
} from "../utils/stationFiltering";

export type StationsAction =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SELECT_STATION"; payload: StationUIModel }
  | { type: "SUBMIT_STATION"; payload: StationUIModel }
  | { type: "CLEAR_SELECTED_STATION" }
  | { type: "SET_STATIONS"; payload: StationUIModel[] }
  | { type: "SET_RECENT_STATIONS"; payload: StationUIModel[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: { error: unknown; isError: boolean } }
  | { type: "REFETCH_COMPLETE"; payload: { stations: StationUIModel[]; error?: unknown } };

export interface StationsState {
  searchTerm: string;
  selectedStation: StationUIModel | null;
  stations: StationUIModel[];
  recentStations: StationUIModel[];
  filteredStations: StationUIModel[];
  searchableStations: StationUIModel[];
  availableNextChars: string[];
  nextCharSuggestion: string;
  isLoading: boolean;
  error: unknown;
  isError: boolean;
  hasRecentStations: boolean;
}

export const initialStationsState: StationsState = {
  searchTerm: "",
  selectedStation: null,
  stations: [],
  recentStations: [],
  filteredStations: [],
  searchableStations: [],
  availableNextChars: [],
  nextCharSuggestion: "",
  isLoading: true,
  error: null,
  isError: false,
  hasRecentStations: false,
};

export const stationsReducer = (state: StationsState, action: StationsAction): StationsState => {
  switch (action.type) {
    case "SET_SEARCH_TERM": {
      const searchTerm = action.payload;
      const filteredStations = searchTerm
        ? filterStations(state.searchableStations, searchTerm)
        : calculateFilteredStations(
            state.searchableStations,
            state.recentStations,
            "", // empty search term
            state.isError,
            state.stations,
          );

      return {
        ...state,
        searchTerm,
        filteredStations,
        nextCharSuggestion: getNextCharSuggestion(filteredStations, searchTerm),
        availableNextChars: getAvailableNextChars(filteredStations, searchTerm),
      };
    }

    case "SELECT_STATION": {
      return {
        ...state,
        selectedStation: action.payload,
        searchTerm: "",
        nextCharSuggestion: "",
        availableNextChars: [],
      };
    }

    case "SUBMIT_STATION": {
      const station = action.payload;
      const updatedRecent = addRecentSearch(station);

      const filteredStations = calculateFilteredStations(
        state.searchableStations,
        updatedRecent,
        "", // empty search term after selection
        state.isError,
        state.stations,
      );

      return {
        ...state,
        recentStations: updatedRecent,
        hasRecentStations: updatedRecent.length > 0,
        filteredStations,
        nextCharSuggestion: "",
        availableNextChars: [],
      };
    }

    case "CLEAR_SELECTED_STATION":
      return {
        ...state,
        selectedStation: null,
      };

    case "SET_STATIONS": {
      const stations = action.payload;
      const searchableStations = calculateSearchableStations(
        stations,
        state.recentStations,
        state.isLoading,
        state.isError,
      );

      const filteredStations = state.searchTerm
        ? filterStations(searchableStations, state.searchTerm)
        : calculateFilteredStations(
            searchableStations,
            state.recentStations,
            state.searchTerm,
            state.isError,
            stations,
          );

      return {
        ...state,
        stations,
        searchableStations,
        filteredStations,
        nextCharSuggestion: getNextCharSuggestion(filteredStations, state.searchTerm),
        availableNextChars: getAvailableNextChars(filteredStations, state.searchTerm),
      };
    }

    case "SET_RECENT_STATIONS": {
      const recentStations = action.payload;
      const hasRecentStations = recentStations.length > 0;

      const searchableStations = calculateSearchableStations(
        state.stations,
        recentStations,
        state.isLoading,
        state.isError,
      );

      const filteredStations = state.searchTerm
        ? filterStations(searchableStations, state.searchTerm)
        : calculateFilteredStations(
            searchableStations,
            recentStations,
            state.searchTerm,
            state.isError,
            state.stations,
          );

      return {
        ...state,
        recentStations,
        hasRecentStations,
        searchableStations,
        filteredStations,
        nextCharSuggestion: getNextCharSuggestion(filteredStations, state.searchTerm),
        availableNextChars: getAvailableNextChars(filteredStations, state.searchTerm),
      };
    }

    case "SET_LOADING": {
      const isLoading = action.payload;
      const searchableStations = calculateSearchableStations(
        state.stations,
        state.recentStations,
        isLoading,
        state.isError,
      );

      const filteredStations = state.searchTerm
        ? filterStations(searchableStations, state.searchTerm)
        : calculateFilteredStations(
            searchableStations,
            state.recentStations,
            state.searchTerm,
            state.isError,
            state.stations,
          );

      return {
        ...state,
        isLoading,
        searchableStations,
        filteredStations,
        nextCharSuggestion: getNextCharSuggestion(filteredStations, state.searchTerm),
        availableNextChars: getAvailableNextChars(filteredStations, state.searchTerm),
      };
    }

    case "SET_ERROR": {
      const { error, isError } = action.payload;
      const searchableStations = calculateSearchableStations(
        state.stations,
        state.recentStations,
        state.isLoading,
        isError,
      );

      const filteredStations = state.searchTerm
        ? filterStations(searchableStations, state.searchTerm)
        : calculateFilteredStations(
            searchableStations,
            state.recentStations,
            state.searchTerm,
            isError,
            state.stations,
          );

      return {
        ...state,
        error,
        isError,
        searchableStations,
        filteredStations,
        nextCharSuggestion: getNextCharSuggestion(filteredStations, state.searchTerm),
        availableNextChars: getAvailableNextChars(filteredStations, state.searchTerm),
      };
    }

    case "REFETCH_COMPLETE": {
      const { stations, error } = action.payload;
      const isError = Boolean(error);

      const searchableStations = calculateSearchableStations(
        stations,
        state.recentStations,
        false,
        isError,
      );

      const filteredStations = state.searchTerm
        ? filterStations(searchableStations, state.searchTerm)
        : calculateFilteredStations(
            searchableStations,
            state.recentStations,
            state.searchTerm,
            isError,
            stations,
          );

      return {
        ...state,
        stations,
        isLoading: false,
        error: error || null,
        isError,
        searchableStations,
        filteredStations,
        nextCharSuggestion: getNextCharSuggestion(filteredStations, state.searchTerm),
        availableNextChars: getAvailableNextChars(filteredStations, state.searchTerm),
      };
    }

    default:
      return state;
  }
};

function calculateSearchableStations(
  stations: StationUIModel[],
  recentStations: StationUIModel[],
  isLoading: boolean,
  isError: boolean,
): StationUIModel[] {
  if ((isLoading || isError) && recentStations.length > 0) {
    return recentStations;
  }
  return stations || [];
}

function calculateFilteredStations(
  searchableStations: StationUIModel[],
  recentStations: StationUIModel[],
  searchTerm: string,
  isError: boolean,
  stations: StationUIModel[],
): StationUIModel[] {
  if (searchTerm) {
    return filterStations(searchableStations, searchTerm);
  } else if (isError && (!stations || stations.length === 0)) {
    return recentStations;
  } else {
    const recentCodes = new Set(recentStations.map((station) => station.code));
    const otherStations = searchableStations.filter((station) => !recentCodes.has(station.code));
    return [...recentStations, ...otherStations];
  }
}
