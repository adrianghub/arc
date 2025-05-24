import { Search } from "lucide-react";
import type { RefObject } from "react";
import React, { useEffect } from "react";

interface StationSearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
  ghostTextRef: RefObject<HTMLDivElement | null>;
  measurementRef: RefObject<HTMLSpanElement | null>;
  nextCharSuggestion: string | null;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  updateGhostTextPosition: () => void;
}

export const StationSearchInput = ({
  searchTerm,
  setSearchTerm,
  searchInputRef,
  ghostTextRef,
  measurementRef,
  nextCharSuggestion,
  handleKeyDown,
  updateGhostTextPosition,
}: StationSearchInputProps) => {
  useEffect(() => {
    updateGhostTextPosition();
  }, [searchTerm, updateGhostTextPosition]);

  return (
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
          aria-autocomplete="list"
          aria-controls="station-listbox"
          aria-expanded={true}
        />

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
  );
};
