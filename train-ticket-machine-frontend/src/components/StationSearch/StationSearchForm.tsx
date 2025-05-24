import { Search } from "lucide-react";
import React, { useState } from "react";
import type { StationUIModel } from "../../api/station";
import { getStationData } from "../../mock-data/station-list";
import { addRecentSearch } from "../../utils/recentSearches";
import { Button } from "../common/Button";
import { Form, FormControl, FormField, FormLabel, FormSubmit } from "../common/Form";
import { StationCombobox } from "./StationCombobox";

const DEPARTURE_STATION_FIELD_NAME = "departureStation";

interface StationSearchFormProps {
  onStationSelect?: (station: string) => void;
  onSubmit?: (station: StationUIModel) => void;
}

export const StationSearchForm: React.FC<StationSearchFormProps> = ({
  onStationSelect,
  onSubmit,
}) => {
  const [selectedStation, setSelectedStation] = useState<StationUIModel | null>(null);

  const handleStationSelect = (station: StationUIModel | null) => {
    setSelectedStation(station);

    if (onStationSelect && station) {
      onStationSelect(station.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStation) {
      addRecentSearch({
        name: selectedStation.name,
        code: selectedStation.code,
      });

      if (onSubmit) {
        onSubmit(selectedStation);
      }

      setSelectedStation(null);
    }
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
            <StationCombobox
              stations={getStationData()}
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
