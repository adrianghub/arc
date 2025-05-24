import React, { useEffect, useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import type { StationUIModel } from "../../api/station";
import { highlightStationText } from "../../utils/highlightStationText";
import {
  getStationListData,
  shouldShowContent,
  shouldShowNoResultsMessage,
} from "../../utils/stationListHelpers";

interface StationListProps {
  searchTerm: string;
  isOpen: boolean;
  recentSearches: StationUIModel[];
  filteredStations: StationUIModel[];
  stations: StationUIModel[];
  selectedStation?: StationUIModel | null;
  highlightedIndex: number;
  onStationSelect: (station: StationUIModel) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  id?: string;
  nextCharSuggestion?: string;
}

export const StationList = ({
  searchTerm,
  isOpen,
  recentSearches,
  filteredStations,
  stations,
  selectedStation,
  highlightedIndex,
  onStationSelect,
  onKeyDown,
  id,
}: StationListProps) => {
  const { displayStations, stationsToRender, showRecentLayout } = getStationListData(
    searchTerm,
    isOpen,
    recentSearches,
    filteredStations,
    stations,
    selectedStation,
  );

  const listboxRef = useRef<HTMLDivElement>(null);
  const highlightedItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightedIndex >= 0 && highlightedItemRef.current) {
      highlightedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  if (shouldShowNoResultsMessage(stationsToRender, searchTerm)) {
    return <div className="px-3 py-4 text-center text-gray-400">No matching stations found</div>;
  }

  if (!shouldShowContent(stationsToRender, searchTerm, stations)) {
    return null;
  }

  let headerRenderedForRecent = false;
  let headerRenderedForAllStations = false;

  const isStationInRecent = (station: StationUIModel) => {
    return recentSearches.some((recentStation) => recentStation.code === station.code);
  };

  return (
    <div
      className="max-h-[300px] overflow-y-auto"
      role="listbox"
      aria-labelledby={id}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      ref={listboxRef}
    >
      {stationsToRender.map((station, itemIndex) => {
        const originalIndex = displayStations.indexOf(station);
        const isHighlighted = originalIndex === highlightedIndex;

        const isRecentItemRendered = showRecentLayout && isStationInRecent(station);
        const isFirstOfAllStationsSection =
          showRecentLayout &&
          recentSearches.length > 0 &&
          !isRecentItemRendered &&
          !headerRenderedForAllStations;

        const itemContent = (
          <div
            data-index={originalIndex}
            role="option"
            aria-selected={isHighlighted}
            onClick={() => onStationSelect(station)}
            className={`cursor-pointer px-3 py-2.5 ${isHighlighted ? "bg-gray-700" : ""} text-gray-200 hover:bg-gray-700 ${itemIndex < stationsToRender.length - 1 ? "border-b border-gray-700/50" : ""} ${isRecentItemRendered ? "pl-5" : ""} `}
            tabIndex={-1}
            ref={isHighlighted ? highlightedItemRef : undefined}
          >
            <div className="flex items-center justify-between">
              <div>{highlightStationText(station.name, searchTerm)}</div>
              <div className="ml-2 text-sm text-gray-400">{station.code}</div>
            </div>
          </div>
        );

        return (
          <Fragment
            key={`${isRecentItemRendered ? "recent-" : "item-"}${station.code}-${originalIndex}`}
          >
            {isRecentItemRendered &&
              !headerRenderedForRecent &&
              (() => {
                headerRenderedForRecent = true;
                return (
                  <div className="border-b border-gray-700/50 px-3 py-2 text-sm font-semibold text-gray-400">
                    Recent Searches
                  </div>
                );
              })()}
            {isFirstOfAllStationsSection &&
              (() => {
                headerRenderedForAllStations = true;
                return (
                  <div className="mt-1 border-t border-b border-gray-700/50 px-3 py-2 text-sm font-semibold text-gray-400">
                    All Stations
                  </div>
                );
              })()}
            {itemContent}
          </Fragment>
        );
      })}
    </div>
  );
};
