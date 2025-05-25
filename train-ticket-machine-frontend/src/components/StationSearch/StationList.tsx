import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useRef } from "react";
import { FixedSizeList } from "react-window";
import type { StationUIModel } from "../../api/station";
import { StationItem } from "./StationItem";

interface StationListProps {
  filteredStations: StationUIModel[];
  selectedStation: StationUIModel | null;
  searchTerm: string;
  highlightedIndex: number;
  handleStationSelect: (station: StationUIModel) => void;
  isStationRecent: (station: StationUIModel) => boolean;
  isLoading: boolean;
  isError: boolean;
  hasRecentStations: boolean;
  refetch: () => void;
  listboxRef: React.RefObject<HTMLDivElement | null>;
}

const StatusBar = ({ isError, refetch }: { isError: boolean; refetch: () => void }) => (
  <div
    className={`sticky top-0 z-10 flex items-center justify-between p-2 text-xs text-white ${
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
);

const EmptyMessage = ({ searchTerm }: { searchTerm: string }) => (
  <div className="px-3 py-4 text-center">
    {searchTerm.length > 0 ? (
      <span className="text-gray-400">No matching stations found</span>
    ) : (
      <span className="text-gray-400">Type to search for a station</span>
    )}
  </div>
);

const EmptyWithRecent = ({
  isError,
  isLoading,
  refetch,
}: {
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
}) => (
  <div className="px-3 py-4 text-center">
    {isError ? (
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
    )}
  </div>
);

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
  const ITEM_HEIGHT = 65;
  const MAX_HEIGHT = 300;

  const listRef = useRef<FixedSizeList>(null);

  const displayedStations = selectedStation
    ? filteredStations.filter((station) => station.code !== selectedStation.code)
    : filteredStations;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0);
    }
  }, [searchTerm, displayedStations.length]);

  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0 && displayedStations.length > 0) {
      listRef.current.scrollToItem(highlightedIndex, "smart");
    }
  }, [highlightedIndex, displayedStations.length]);

  if (isLoading && !hasRecentStations) {
    return (
      <div className="flex h-32 items-center justify-center">
        <span className="text-gray-400">Loading stations...</span>
      </div>
    );
  }

  if (isError && !hasRecentStations) {
    return (
      <div className="flex h-32 flex-col items-center justify-center gap-2 p-4 text-center">
        <div className="flex items-center text-red-400">
          <AlertCircle className="mr-2 h-5 w-5" />
          <span>Failed to load stations</span>
        </div>
        <button
          onClick={refetch}
          className="flex items-center rounded-md bg-red-900/30 px-3 py-1.5 text-sm text-red-200 hover:bg-red-900/40"
        >
          <RefreshCw className="mr-1.5 h-3 w-3" />
          Retry
        </button>
      </div>
    );
  }

  if ((isLoading || isError) && hasRecentStations && displayedStations.length === 0) {
    return (
      <div
        ref={listboxRef}
        className="max-h-[300px] overflow-y-auto"
        role="listbox"
        id="station-listbox"
        tabIndex={-1}
      >
        <StatusBar isError={isError} refetch={refetch} />
        <EmptyWithRecent isError={isError} isLoading={isLoading} refetch={refetch} />
      </div>
    );
  }

  if (displayedStations.length === 0) {
    return (
      <div className="max-h-[300px] overflow-y-auto">
        <EmptyMessage searchTerm={searchTerm} />
      </div>
    );
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const station = displayedStations[index];
    const borderClass = index < displayedStations.length - 1 ? "border-b border-gray-700/50" : "";
    const isHighlighted = index === highlightedIndex;

    return (
      <div
        style={style}
        className={borderClass}
        data-scroll-triggered={isHighlighted ? "true" : undefined}
      >
        <StationItem
          key={station.code}
          station={station}
          isSelected={false}
          searchTerm={searchTerm}
          isHighlighted={isHighlighted}
          onClick={() => handleStationSelect(station)}
          isRecent={isStationRecent(station)}
          data-index={index}
        />
      </div>
    );
  };

  return (
    <div
      ref={listboxRef}
      className="max-h-[300px] overflow-hidden"
      role="listbox"
      id="station-listbox"
      tabIndex={-1}
    >
      {(isLoading || isError) && hasRecentStations && (
        <StatusBar isError={isError} refetch={refetch} />
      )}

      <div className="w-full">
        <FixedSizeList
          ref={listRef}
          height={Math.min(displayedStations.length * ITEM_HEIGHT, MAX_HEIGHT)}
          width="100%"
          itemCount={displayedStations.length}
          itemSize={ITEM_HEIGHT}
          overscanCount={5}
          className="scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600"
        >
          {Row}
        </FixedSizeList>
      </div>
    </div>
  );
};
