import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { StationUIModel } from "../../api/station";
import { useStationsContext } from "../../context/useStationsContext";
import { useGhostText } from "../../hooks/useGhostText";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import { AvailableNextChars } from "./AvailableNextChars";
import { SelectedStationItem } from "./SelectedStationItem";
import { StationComboboxTriggerButton } from "./StationComboboxTriggerButton";
import { StationList } from "./StationList";
import { StationSearchInput } from "./StationSearchInput";

export interface StationComboboxProps {
  stations: StationUIModel[];
  selectedStation?: StationUIModel | null;
  onStationSelect: (station: StationUIModel | null) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export const StationCombobox = ({
  selectedStation: externalSelectedStation,
  onStationSelect,
  placeholder = "Select station...",
  className = "",
  id,
  disabled = false,
}: StationComboboxProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const isControlled = externalSelectedStation !== undefined;

  const {
    searchTerm,
    setSearchTerm,
    filteredStations,
    selectedStation: contextSelectedStation,
    nextCharSuggestion,
    availableNextChars,
    recentStations,
    isLoading,
    isError,
    hasRecentStations,
    refetch,
    selectStation: contextSelectStation,
    clearSelectedStation: contextClearSelectedStation,
  } = useStationsContext();

  const selectedStation = isControlled ? externalSelectedStation : contextSelectedStation;

  const [isOpen, setIsOpen] = useState(false);

  const {
    ghostTextRef,
    measurementRef,
    inputRef: searchInputRef,
    updateGhostTextPosition,
  } = useGhostText({
    inputValue: searchTerm,
    suggestion: nextCharSuggestion,
  });

  const { highlightedIndex, handleKeyDown: handleNavKeyDown } = useKeyboardNavigation({
    displayStations: filteredStations,
    onStationSelect: (station) => handleStationSelect(station),
    onClose: () => setIsOpen(false),
    nextCharSuggestion,
    searchTerm,
    onSearchTermChange: (term) => {
      setSearchTerm(term);
    },
  });

  useEffect(() => {
    if (highlightedIndex >= 0 && listboxRef.current) {
      const highlightedElement = listboxRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`,
      ) as HTMLElement;

      if (highlightedElement) {
        const container = listboxRef.current;
        const containerRect = container.getBoundingClientRect();
        const highlightedRect = highlightedElement.getBoundingClientRect();

        if (highlightedRect.bottom > containerRect.bottom) {
          container.scrollTop += highlightedRect.bottom - containerRect.bottom;
        } else if (highlightedRect.top < containerRect.top) {
          container.scrollTop -= containerRect.top - highlightedRect.top;
        }
      }
    }
  }, [highlightedIndex]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Use a slight delay to ensure the DOM is ready
      searchInputRef.current?.focus();
    }
  }, [isOpen, searchInputRef]);

  const handleStationSelect = (station: StationUIModel | null) => {
    if (!isControlled) {
      if (station) {
        contextSelectStation(station);
      } else {
        contextClearSelectedStation();
      }
    }

    onStationSelect(station);
    setIsOpen(false);

    if (triggerRef.current) {
      // Focus the trigger button after a short delay to avoid immediate focus loss
      setTimeout(() => {
        triggerRef.current?.focus();
      }, 10);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && nextCharSuggestion && !e.shiftKey) {
      e.preventDefault();

      const newValue = searchTerm + nextCharSuggestion;
      setSearchTerm(newValue);

      requestAnimationFrame(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.setSelectionRange(newValue.length, newValue.length);

          updateGhostTextPosition();
        }
      });

      return;
    }

    if (e.key === "Enter" && filteredStations.length === 1 && !selectedStation) {
      e.preventDefault();
      handleStationSelect(filteredStations[0]);
      return;
    }

    if (isOpen) {
      handleNavKeyDown(e);
    }
  };

  const isStationRecent = (station: StationUIModel) => {
    return recentStations.some((s) => s.code === station.code);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && !hasRecentStations && (
        <div className="flex h-[56px] w-full items-center justify-center rounded-lg border border-gray-600 bg-gray-700">
          <span className="text-gray-400">Loading stations...</span>
        </div>
      )}

      {isError && !hasRecentStations && (
        <div className="flex h-[56px] w-full items-center justify-center gap-2 rounded-lg border border-red-600 bg-gray-700 px-4 py-2">
          <div className="flex items-center text-red-400">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span>Error loading stations</span>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center rounded-sm bg-red-900/30 px-3 py-1.5 text-xs text-red-200 hover:bg-red-900/40"
          >
            <RefreshCw className="mr-1.5 h-3 w-3" />
            Try again
          </button>
        </div>
      )}

      {!((isLoading || isError) && !hasRecentStations) && (
        <div className="relative w-full">
          <StationComboboxTriggerButton
            triggerRef={triggerRef}
            isOpen={isOpen}
            selectedStation={selectedStation}
            placeholder={placeholder}
            id={id}
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
              <div className="flex flex-col">
                <StationSearchInput
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  searchInputRef={searchInputRef}
                  ghostTextRef={ghostTextRef}
                  measurementRef={measurementRef}
                  nextCharSuggestion={nextCharSuggestion}
                  handleKeyDown={handleKeyDown}
                  updateGhostTextPosition={updateGhostTextPosition}
                />

                {availableNextChars.length > 0 && (
                  <div className="border-t border-gray-700">
                    <AvailableNextChars availableNextChars={availableNextChars} />
                  </div>
                )}

                {selectedStation && (
                  <SelectedStationItem
                    selectedStation={selectedStation.name || ""}
                    onClearSelection={() => handleStationSelect(null)}
                  />
                )}

                <StationList
                  filteredStations={filteredStations}
                  selectedStation={selectedStation}
                  searchTerm={searchTerm}
                  highlightedIndex={highlightedIndex}
                  handleStationSelect={handleStationSelect}
                  isStationRecent={isStationRecent}
                  isLoading={isLoading}
                  isError={isError}
                  hasRecentStations={hasRecentStations}
                  refetch={refetch}
                  listboxRef={listboxRef}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
