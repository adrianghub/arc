import { Search } from "lucide-react";
import React, { useCallback } from "react";
import { useStationsContext } from "../../context/useStationsContext";
import { Button } from "../common/Button";
import { ErrorDisplay } from "../common/ErrorDisplay";
import { Form, FormControl, FormField, FormLabel, FormSubmit } from "../common/Form";
import { LoadingIndicator } from "../common/LoadingIndicator";
import { StationCombobox } from "./StationCombobox";

const DEPARTURE_STATION_FIELD_NAME = "departureStation";

interface StationSearchFormProps {
  onStationSelect?: (station: string) => void;
  onSubmit?: () => void;
}

export const StationSearchForm = ({ onStationSelect, onSubmit }: StationSearchFormProps) => {
  const {
    stations,
    selectedStation,
    selectStation,
    clearSelectedStation,
    isLoading,
    error,
    isError,
    hasRecentStations,
    refetch,
  } = useStationsContext();

  const handleStationSelect = useCallback(
    (station: typeof selectedStation) => {
      if (station) {
        selectStation(station);
        if (onStationSelect) {
          onStationSelect(station.name);
        }
      } else {
        clearSelectedStation();
      }
    },
    [selectStation, clearSelectedStation, onStationSelect],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedStation) {
        if (onSubmit) {
          onSubmit();
        }
      }
    },
    [selectedStation, onSubmit],
  );

  if (isLoading && !hasRecentStations) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-12">
        <LoadingIndicator size={32} />
        <p className="mt-4 text-center text-gray-500">Loading stations...</p>
      </div>
    );
  }

  if (isError && !hasRecentStations) {
    return (
      <div className="w-full max-w-lg px-4">
        <ErrorDisplay error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <Form
      title="Find your departure station"
      onSubmit={handleSubmit}
      maxWidth="lg"
      className="w-full touch-manipulation px-2 sm:px-4"
    >
      <FormField name={DEPARTURE_STATION_FIELD_NAME} className="relative">
        <div className="flex flex-col space-y-1">
          <FormLabel className="text-base font-medium text-gray-300">Departure Station</FormLabel>
          <FormControl asChild>
            <StationCombobox
              stations={stations}
              selectedStation={selectedStation}
              onStationSelect={handleStationSelect}
              id="departure-station"
              placeholder="Tap to search stations..."
            />
          </FormControl>
        </div>
      </FormField>

      <div className="flex justify-center pt-6">
        <FormSubmit asChild>
          <Button
            size="lg"
            fullWidth
            disabled={!selectedStation}
            className="py-4 text-base sm:text-lg"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Stations
          </Button>
        </FormSubmit>
      </div>
    </Form>
  );
};
