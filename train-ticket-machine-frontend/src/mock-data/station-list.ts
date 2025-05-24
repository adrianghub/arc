import type { StationAPIResponse, StationUIModel } from "../api/station";
import { mapStationListAPIResponseToUIModel } from "../api/station.service";

import stationData from "./station_codes.json";

export const getStationData = (count?: number): StationUIModel[] => {
  const apiData = count
    ? (stationData as StationAPIResponse[]).slice(0, count)
    : (stationData as StationAPIResponse[]);

  return mapStationListAPIResponseToUIModel(apiData);
};
