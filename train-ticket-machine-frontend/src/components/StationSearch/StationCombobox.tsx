import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { StationUIModel } from "../../api/station";
import { useGhostText } from "../../hooks/useGhostText";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import { highlightStationText } from "../../utils/highlightStationText";
import {
  addRecentSearch,
  getRecentSearches,
  RECENT_STATION_SEARCHES_KEY,
} from "../../utils/recentSearches";
import {
  filterStations,
  getAvailableNextChars,
  getNextCharSuggestion,
} from "../../utils/stationFiltering";
import { AvailableNextChars } from "./AvailableNextChars";
import { SelectedStationItem } from "./SelectedStationItem";

export interface StationComboboxProps {
  stations: StationUIModel[];
  selectedStation?: StationUIModel | null;
  onStationSelect: (station: StationUIModel | null) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export const StationCombobox: React.FC<StationComboboxProps> = ({
  stations,
  selectedStation,
  onStationSelect,
  placeholder = "Select station...",
  className = "",
  id,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<StationUIModel[]>(() => {
    const initialRecent = getRecentSearches();
    return initialRecent.filter((item) => {
      return stations.some((s) => s.code === item.code);
    });
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const allStationsWithRecent = [
    ...recentSearches,
    ...stations.filter((station) => !recentSearches.some((recent) => recent.code === station.code)),
  ];

  const filteredStations = filterStations(allStationsWithRecent, searchTerm);

  const nextCharSuggestion = getNextCharSuggestion(filteredStations, searchTerm);
  const availableNextChars = getAvailableNextChars(filteredStations, searchTerm);

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
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === RECENT_STATION_SEARCHES_KEY) {
        const recentStations = getRecentSearches().filter((item) => {
          return stations.some((s) => s.code === item.code);
        });
        setRecentSearches(recentStations);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [stations]);

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
    updateGhostTextPosition();
  }, [searchTerm, updateGhostTextPosition]);

  const handleStationSelect = (station: StationUIModel | null) => {
    onStationSelect(station);
    setIsOpen(false);
    setSearchTerm("");

    if (station) {
      const updatedRecentSearches = addRecentSearch(station);
      const recentStations = updatedRecentSearches.filter((item) => {
        return stations.some((s) => s.code === item.code);
      });
      setRecentSearches(recentStations);
    }

    if (triggerRef.current) {
      setTimeout(() => {
        triggerRef.current?.focus();
      }, 10);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && nextCharSuggestion && !e.shiftKey) {
      e.preventDefault();

      // Immediately set the new value
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

    if (isOpen) {
      handleNavKeyDown(e);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setSearchTerm("");
    }
  };

  const isStationRecent = (station: StationUIModel) => {
    return recentSearches.some((s) => s.code === station.code);
  };

  return (
    <div className={`relative ${className}`}>
      <Popover.Root open={isOpen} onOpenChange={handleOpenChange} modal={true}>
        <Popover.Trigger asChild disabled={disabled}>
          <button
            type="button"
            ref={triggerRef}
            onClick={() => setIsOpen(true)}
            className={`flex min-h-[56px] w-full items-center justify-between rounded-lg border bg-gray-700 px-4 py-3 text-left text-base sm:text-lg ${
              selectedStation ? "border-indigo-500 text-white" : "border-gray-600 text-gray-400"
            }`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            id={id}
            disabled={disabled}
          >
            <div className="flex flex-col truncate">
              <span className="truncate">{selectedStation?.name || placeholder}</span>
              {selectedStation && (
                <span className="truncate text-sm text-gray-400">{selectedStation.code}</span>
              )}
            </div>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180 transform" : ""}`}
            />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="z-50 max-w-[95vw] overflow-hidden rounded-lg border border-gray-700 bg-gray-800 p-0 shadow-lg data-[side=bottom]:mt-1 sm:max-w-[85vw] md:max-w-none"
            sideOffset={5}
            align="start"
            style={{ width: "var(--radix-popover-trigger-width)" }}
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              setTimeout(() => {
                searchInputRef.current?.focus();
              }, 0);
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              if (triggerRef.current) {
                triggerRef.current.focus();
              }
            }}
          >
            <div className="flex flex-col">
              <div className="relative border-b border-gray-700 p-2">
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 transform text-gray-300" />
                  <input
                    type="text"
                    placeholder="Search by name or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={searchInputRef}
                    className="w-full rounded-md border border-gray-700 bg-gray-900 py-2 pr-4 pl-10 text-sm text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    autoComplete="off"
                  />

                  {/* Ghost text suggestion */}
                  {nextCharSuggestion && searchTerm && (
                    <div
                      ref={ghostTextRef}
                      className="absolute text-sm text-gray-500"
                      style={{
                        pointerEvents: "none",
                      }}
                    >
                      {nextCharSuggestion}
                    </div>
                  )}

                  <span
                    ref={measurementRef}
                    style={{
                      position: "absolute",
                      visibility: "hidden",
                      whiteSpace: "pre",
                      left: "-100vw",
                      top: "-100vh",
                      fontFamily: "inherit",
                    }}
                  >
                    {searchTerm}
                  </span>
                </div>
              </div>

              {isOpen && availableNextChars.length > 0 && (
                <div className="border-t border-gray-700">
                  <AvailableNextChars availableNextChars={availableNextChars} />
                </div>
              )}

              {selectedStation && (
                <SelectedStationItem
                  selectedStation={selectedStation.name}
                  onClearSelection={() => handleStationSelect(null)}
                />
              )}

              {isOpen && (
                <div
                  className="max-h-[300px] overflow-y-auto"
                  ref={listboxRef}
                  role="listbox"
                  aria-labelledby={id}
                  tabIndex={-1}
                >
                  {filteredStations.length > 0 ? (
                    filteredStations.map((station, index) => {
                      if (selectedStation && station.code === selectedStation.code) {
                        return null;
                      }

                      const isHighlighted = index === highlightedIndex;
                      const isRecent = isStationRecent(station);

                      return (
                        <div
                          key={station.code}
                          data-index={index}
                          role="option"
                          aria-selected={isHighlighted}
                          onClick={() => handleStationSelect(station)}
                          className={`cursor-pointer px-3 py-2.5 ${
                            isHighlighted ? "bg-gray-700" : "hover:bg-gray-700"
                          } ${
                            index < filteredStations.length - 1 ? "border-b border-gray-700/50" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className={`${isHighlighted ? "text-white" : "text-gray-200"}`}>
                                {searchTerm
                                  ? highlightStationText(station.name, searchTerm)
                                  : station.name}
                              </span>
                              <span
                                className={`text-sm ${isHighlighted ? "text-gray-300" : "text-gray-400"}`}
                              >
                                {station.code}
                              </span>
                            </div>
                            {isRecent && <span className="ml-2 text-xs text-gray-400">Recent</span>}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-3 py-4 text-center text-gray-400">
                      No matching stations found
                    </div>
                  )}
                </div>
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};
