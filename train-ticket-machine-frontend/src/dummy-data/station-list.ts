interface StationData {
  stationCode: string;
  stationName: string;
}

// Import the station data
import stationData from "./station_codes.json";

export const getStationData = (count?: number): StationData[] => {
  return count ? (stationData as StationData[]).slice(0, count) : (stationData as StationData[]);
};
