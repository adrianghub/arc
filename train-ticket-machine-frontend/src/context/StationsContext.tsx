import { useCallback, useEffect, useReducer, type ReactNode } from "react";
import type { StationUIModel } from "../api/station";
import { useStationsQuery } from "../hooks/useStationsQuery";
import { getRecentSearches, RECENT_STATION_SEARCHES_KEY } from "../utils/recentSearches";
import { initialStationsState, stationsReducer } from "./StationsReducer";
import { StationsContext } from "./useStationsContext";

interface StationsProviderProps {
  children: ReactNode;
}

export function StationsProvider({ children }: StationsProviderProps) {
  const [state, dispatch] = useReducer(stationsReducer, initialStationsState);

  const {
    stations,
    recentStations: queryRecentStations,
    isLoading,
    error,
    isError,
    refetch,
    hasRecentStations: queryHasRecentStations,
  } = useStationsQuery();

  useEffect(() => {
    if (stations && stations.length > 0) {
      dispatch({ type: "SET_STATIONS", payload: stations });
    }
  }, [stations]);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  }, [isLoading]);

  useEffect(() => {
    dispatch({
      type: "SET_ERROR",
      payload: { error, isError },
    });
  }, [error, isError]);

  useEffect(() => {
    if (queryRecentStations?.length) {
      dispatch({ type: "SET_RECENT_STATIONS", payload: queryRecentStations });
    }
  }, [queryRecentStations]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === RECENT_STATION_SEARCHES_KEY) {
        const recentStations = getRecentSearches();
        dispatch({ type: "SET_RECENT_STATIONS", payload: recentStations });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  }, []);

  const selectStation = useCallback((station: StationUIModel) => {
    dispatch({ type: "SELECT_STATION", payload: station });
  }, []);

  const clearSelectedStation = useCallback(() => {
    dispatch({ type: "CLEAR_SELECTED_STATION" });
  }, []);

  const handleRefetch = useCallback(async () => {
    try {
      const result = await refetch();
      const stationsData = (result.data || []) as StationUIModel[];
      dispatch({
        type: "REFETCH_COMPLETE",
        payload: { stations: stationsData },
      });
      return result;
    } catch (err) {
      dispatch({
        type: "REFETCH_COMPLETE",
        payload: { stations: [], error: err },
      });
      throw err;
    }
  }, [refetch]);

  const value = {
    ...state,
    hasRecentStations: state.hasRecentStations || Boolean(queryHasRecentStations),
    setSearchTerm,
    selectStation,
    clearSelectedStation,
    refetch: handleRefetch,
    dispatch,
  };

  return <StationsContext.Provider value={value}>{children}</StationsContext.Provider>;
}
