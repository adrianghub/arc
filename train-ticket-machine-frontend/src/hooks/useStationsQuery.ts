import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { StationUIModel } from "../api/station";
import { fetchStations } from "../api/station.service";
import { getRecentSearches } from "../utils/recentSearches";

export const stationsQueryKey = ["stations"];

export function useStationsQuery() {
  const recentStations = useMemo(() => getRecentSearches(), []);
  const hasRecentStations = recentStations.length > 0;

  const {
    data: stations = [] as StationUIModel[],
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery<StationUIModel[]>({
    queryKey: stationsQueryKey,
    queryFn: () => fetchStations(),
  });

  const stationsWithRecent = useMemo(
    () =>
      stations.map((station) => ({
        ...station,
        isRecent: recentStations.some((recent) => recent.code === station.code),
      })),
    [stations, recentStations],
  );

  return {
    stations: stationsWithRecent,
    recentStations,
    isLoading,
    error,
    isError,
    refetch,
    hasRecentStations,
  };
}
