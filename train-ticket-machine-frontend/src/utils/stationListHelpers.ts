import type { StationUIModel } from "../api/station";

export interface StationListData {
  displayStations: StationUIModel[];
  stationsToRender: StationUIModel[];
  showRecentLayout: boolean;
}

export const getStationListData = (
  searchTerm: string,
  isOpen: boolean,
  recentSearches: StationUIModel[],
  filteredStations: StationUIModel[],
  stations: StationUIModel[],
  selectedStation?: StationUIModel | null,
): StationListData => {
  const showRecentLayout = searchTerm === "" && isOpen && recentSearches.length > 0;

  const isStationInRecent = (station: StationUIModel) => {
    return recentSearches.some((recent) => recent.code === station.code);
  };

  const displayStations = showRecentLayout
    ? [...recentSearches, ...stations.filter((s) => !isStationInRecent(s))]
    : filteredStations;

  const stationsToRender = selectedStation
    ? displayStations.filter((s) => s.code !== selectedStation.code)
    : displayStations;

  return {
    displayStations,
    stationsToRender,
    showRecentLayout,
  };
};

export const shouldShowNoResultsMessage = (
  stationsToRender: StationUIModel[],
  searchTerm: string,
): boolean => {
  return stationsToRender.length === 0 && searchTerm !== "";
};

export const shouldShowContent = (
  stationsToRender: StationUIModel[],
  searchTerm: string,
  stations: StationUIModel[],
): boolean => {
  if (stationsToRender.length === 0) {
    if (searchTerm === "" && stations.length > 0) {
      return false;
    }
    return searchTerm !== "";
  }
  return true;
};
