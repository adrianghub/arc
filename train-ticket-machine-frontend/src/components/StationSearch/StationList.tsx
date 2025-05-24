import { AlertCircle, RefreshCw } from "lucide-react";
import React from "react";
import type { StationUIModel } from "../../api/station";
import { highlightStationText } from "../../utils/highlightStationText";

interface StationListProps {
  filteredStations: StationUIModel[];
  selectedStation: StationUIModel | null;
  searchTerm: string;
  highlightedIndex: number;
  handleStationSelect: (station: StationUIModel | null) => void;
  isStationRecent: (station: StationUIModel) => boolean;
  isLoading: boolean;
  isError: boolean;
  hasRecentStations: boolean;
  refetch: () => void;
  listboxRef: React.RefObject<HTMLDivElement | null>;
}

export const StationList = ({
  filteredStations,
  selectedStation,
  searchTerm,
  highlightedIndex,
  handleStationSelect,
  isStationRecent,
  isLoading,
  isError,
  hasRecentStations,
  refetch,
  listboxRef,
}: StationListProps) => {
  return (
    <div
      className="max-h-[300px] overflow-y-auto"
      ref={listboxRef}
      role="listbox"
      id="station-listbox"
      tabIndex={-1}
    >
      {(isLoading || isError) && hasRecentStations && (
        <div
          className={`sticky top-0 flex items-center justify-between p-2 text-xs text-white ${
            isError ? "bg-red-900/60" : "bg-indigo-900/60"
          }`}
        >
          <div className="flex items-center">
            {isError ? (
              <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
            ) : (
              <div className="mr-1.5 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            <span>
              {isError
                ? "Error occurred while loading all stations. Choose from the available recent search results or retry."
                : "Loading more stations..."}
            </span>
          </div>
          {isError && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                refetch();
              }}
              className="ml-2 flex items-center rounded bg-red-800/60 px-2 py-0.5 hover:bg-red-800/80"
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              Retry
            </button>
          )}
        </div>
      )}
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
              } ${index < filteredStations.length - 1 ? "border-b border-gray-700/50" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className={`${isHighlighted ? "text-white" : "text-gray-200"}`}>
                    {searchTerm ? highlightStationText(station.name, searchTerm) : station.name}
                  </span>
                  <span className={`text-sm ${isHighlighted ? "text-gray-300" : "text-gray-400"}`}>
                    {station.code}
                  </span>
                </div>
                {isRecent && (
                  <span className="ml-2 rounded-full bg-indigo-900/50 px-2 py-0.5 text-xs text-indigo-300">
                    Recent
                  </span>
                )}
              </div>
            </div>
          );
        })
      ) : searchTerm.length > 0 ? (
        <div className="px-3 py-4 text-center text-gray-400">No matching stations found</div>
      ) : (
        <div className="px-3 py-4 text-center">
          {hasRecentStations ? (
            isError ? (
              <div className="flex flex-col items-center">
                <p className="text-gray-400">Using your recent stations.</p>
                <p className="mb-2 text-sm text-gray-500">Type to search...</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    refetch();
                  }}
                  className="mt-1 flex items-center rounded bg-gray-700 px-3 py-1.5 text-xs text-gray-300 hover:bg-gray-600"
                >
                  <RefreshCw className="mr-1.5 h-3 w-3" />
                  Retry loading all stations
                </button>
              </div>
            ) : isLoading ? (
              <p className="text-gray-400">Type to search your recent stations while loading...</p>
            ) : (
              <p className="text-gray-400">Type to search for a station</p>
            )
          ) : (
            <p className="text-gray-400">Type to search for a station</p>
          )}
        </div>
      )}
    </div>
  );
};
