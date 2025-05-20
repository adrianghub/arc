/**
 * Interface representing a single station from the API response
 */
export interface StationAPIResponse {
  stationName: string;
  stationCode: string;
}

/**
 * Corresponding UI model
 */
export interface StationUIModel {
  name: string;
  code: string;
}
