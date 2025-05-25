import type { Fetcher } from "../lib/fetcher";
import { fetcher as defaultFetcher } from "../lib/fetcher";
import type { StationAPIResponse, StationUIModel } from "./station";

const STATIONS_API_URL =
  "https://raw.githubusercontent.com/abax-as/coding-challenge/master/station_codes.json";

export function mapStationAPIResponseToUIModel(station: StationAPIResponse): StationUIModel {
  return {
    name: station.stationName,
    code: station.stationCode,
  };
}

export function mapStationListAPIResponseToUIModel(
  stations: StationAPIResponse[],
): StationUIModel[] {
  return stations.map(mapStationAPIResponseToUIModel);
}

export async function fetchStationsAPIData(
  fetcher: Fetcher = defaultFetcher,
): Promise<StationAPIResponse[]> {
  try {
    const data = await fetcher<StationAPIResponse[]>(STATIONS_API_URL);
    if (
      !Array.isArray(data) ||
      data.some((station) => !station.stationName || !station.stationCode)
    ) {
      console.error("Fetched data is not in the expected format:", data);
      throw new Error("Invalid station data format received from API.");
    }
    return data;
  } catch (error) {
    console.error("Error fetching station data:", error);
    throw error;
  }
}

/**
 * Fetches and transforms the list of all train stations for UI consumption.
 * @param fetcher The fetcher implementation to use (defaults to default fetcher).
 * @returns A promise that resolves to an array of StationUIModel objects.
 */
export async function fetchStations(fetcher: Fetcher = defaultFetcher): Promise<StationUIModel[]> {
  const apiData = await fetchStationsAPIData(fetcher);
  return mapStationListAPIResponseToUIModel(apiData);
}
