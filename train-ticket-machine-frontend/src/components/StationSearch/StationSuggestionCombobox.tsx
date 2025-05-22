import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, Search, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useStationSuggestions } from "../../hooks/useStationSuggestions";
import { renderStationWithHighlight } from "../../utils/renderStationHighlight";
import { Input } from "../common/Input";

export interface StationSuggestionComboboxProps {
  stations: string[];
  selectedStation?: string | null;
  onStationSelect: (station: string | null) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export const StationSuggestionCombobox: React.FC<StationSuggestionComboboxProps> = ({
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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const { filteredStations, nextCharSuggestion, availableNextChars } = useStationSuggestions({
    stations,
    searchTerm,
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (disabled) return;

    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
    }
  };

  const handleStationSelect = (station: string) => {
    onStationSelect(station);
    setIsOpen(false);
    setSearchTerm("");

    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const handleClearSelection = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.stopPropagation();
    }
    onStationSelect(null);
    setSearchTerm("");

    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredStations.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredStations.length - 1 ? prevIndex + 1 : prevIndex,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;

      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredStations.length) {
          handleStationSelect(filteredStations[highlightedIndex]);
        } else if (nextCharSuggestion && searchTerm) {
          // If no station is highlighted but we have a suggestion, append it
          setSearchTerm(searchTerm + nextCharSuggestion);
        }
        break;

      case "Tab":
        // Accept the suggestion when Tab is pressed
        if (nextCharSuggestion && searchTerm) {
          e.preventDefault();
          setSearchTerm(searchTerm + nextCharSuggestion);
        }
        break;

      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
        break;

      default:
        break;
    }
  };

  const handleSelectedItemKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        handleClearSelection(e);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            ref={triggerRef}
            onClick={handleToggle}
            className={`flex min-h-[56px] w-full items-center justify-between rounded-lg border bg-gray-700 px-4 py-3 text-left text-base sm:text-lg ${
              selectedStation ? "border-indigo-500 text-white" : "border-gray-600 text-gray-400"
            }`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            id={id}
            disabled={disabled}
          >
            <span className="truncate">{selectedStation || placeholder}</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180 transform" : ""}`}
            />
          </button>
        </Popover.Trigger>

        <Popover.Content
          className="z-50 max-w-[95vw] overflow-hidden rounded-lg border border-gray-700 bg-gray-800 p-0 shadow-lg data-[side=bottom]:mt-1 sm:max-w-[85vw] md:max-w-none"
          sideOffset={5}
          align="start"
          style={{ width: "var(--radix-popover-trigger-width)" }}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div className="flex flex-col">
            {/* Search input with inline suggestion */}
            <div className="relative border-b border-gray-700 p-2">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 transform text-gray-300" />
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search station..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyDown}
                    ref={searchInputRef}
                    className="mb-0 border-gray-700 bg-gray-900 py-2 text-base"
                    style={{ paddingLeft: "2.5rem", paddingRight: "1.5rem" }}
                    autoComplete="off"
                  />
                  {nextCharSuggestion && (
                    <div
                      className="pointer-events-none absolute top-1/2 -translate-y-1/2 transform"
                      style={{
                        left: `calc(2.5rem + ${searchTerm.length}ch - 2px)`,
                      }}
                    >
                      <span className="text-base text-gray-500">{nextCharSuggestion}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Next characters suggestions header (variant B - non-clickable) */}
            {availableNextChars.length > 0 && (
              <div className="bg-gray-850 border-b border-gray-700 px-3 py-2">
                <div className="mb-1 text-sm font-medium text-gray-300">
                  Available next characters:
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableNextChars.map((char, index) => (
                    <span
                      key={index}
                      className="rounded bg-gray-800 px-3 py-2 text-base text-gray-300"
                      aria-disabled="true"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions list */}
            <div
              className="max-h-[300px] overflow-y-auto"
              ref={listboxRef}
              role="listbox"
              aria-labelledby={id}
              tabIndex={-1}
              onKeyDown={handleKeyDown}
            >
              {selectedStation && (
                <div
                  className="flex cursor-pointer items-center justify-between border-b border-gray-600 px-3 py-2.5 hover:bg-gray-700"
                  onClick={handleClearSelection}
                  ref={selectedItemRef}
                  tabIndex={0}
                  role="button"
                  aria-pressed="true"
                  onKeyDown={handleSelectedItemKeyDown}
                >
                  <div className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-indigo-400" />
                    <span className="font-medium text-indigo-200">{selectedStation}</span>
                  </div>
                  <X className="h-5 w-5 text-gray-400" />
                </div>
              )}

              {filteredStations.length > 0 ? (
                <div>
                  {filteredStations.map((station, index) => {
                    const isHighlighted = index === highlightedIndex;
                    const isSelected = station === selectedStation;

                    if (isSelected && selectedStation) {
                      return null; // Skip as we already show the selected item at the top
                    }

                    return (
                      <div
                        key={index}
                        data-index={index}
                        role="option"
                        aria-selected={isHighlighted || isSelected}
                        onClick={() => handleStationSelect(station)}
                        className={`cursor-pointer px-3 py-2.5 ${isHighlighted ? "bg-gray-700" : ""} ${
                          isSelected
                            ? "bg-indigo-900/50 font-medium text-indigo-200"
                            : "text-gray-200 hover:bg-gray-700"
                        } ${index < filteredStations.length - 1 ? "border-b border-gray-700/50" : ""}`}
                        tabIndex={-1}
                      >
                        <div className="flex items-center">
                          {isSelected && <Check className="mr-2 h-5 w-5 text-indigo-400" />}
                          {renderStationWithHighlight(station, searchTerm)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-3 py-4 text-center text-gray-400">
                  No matching stations found
                </div>
              )}
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>

      {selectedStation && !isOpen && (
        <button
          type="button"
          className="sr-only"
          aria-label={`Remove selection: ${selectedStation}`}
          tabIndex={0}
          onClick={handleClearSelection}
          onKeyDown={handleSelectedItemKeyDown}
        >
          Clear selection
        </button>
      )}
    </div>
  );
};

export default StationSuggestionCombobox;
