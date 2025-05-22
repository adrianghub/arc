import React from "react";
import { SuggestionCombobox } from "../common/SuggestionCombobox";

export interface StationSuggestionComboboxProps {
  stations: string[];
  selectedStation?: string | null;
  onStationSelect: (station: string | null) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export const StationSuggestionCombobox: React.FC<
  StationSuggestionComboboxProps
> = ({
  stations,
  selectedStation,
  onStationSelect,
  placeholder = "Select station...",
  className,
  id,
  disabled,
}) => {
  return (
    <SuggestionCombobox
      suggestions={stations}
      getOptionLabel={(station) => station}
      onSelect={onStationSelect}
      selectedOption={selectedStation}
      placeholder={placeholder}
      searchPlaceholder='Search station...'
      noResultsMessage='No matching stations found'
      className={className}
      id={id}
      disabled={disabled}
    />
  );
};

export default StationSuggestionCombobox;
