import { Search } from "lucide-react";
import React, { useState } from "react";
import { getStations } from "../../dummy-data/station-list";
import { Button } from "../common/Button";
import { Form, FormControl, FormField, FormLabel, FormSubmit } from "../common/Form";
import StationSuggestionCombobox from "./StationSuggestionCombobox";

const DEPARTURE_STATION_FIELD_NAME = "departureStation";

interface StationSearchFormProps {
  onStationSelect?: (station: string) => void;
}

export const StationSearchForm: React.FC<StationSearchFormProps> = ({ onStationSelect }) => {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const handleStationSelect = (station: string | null) => {
    setSelectedStation(station);

    if (onStationSelect && station) {
      onStationSelect(station);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for station:", selectedStation);
  };

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
            <StationSuggestionCombobox
              stations={getStations()}
              selectedStation={selectedStation}
              onStationSelect={handleStationSelect}
              id="departure-station"
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
