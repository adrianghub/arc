import { useEffect, useState } from "react";
import type { StationUIModel } from "../api/station";

interface UseKeyboardNavigationProps {
  displayStations: StationUIModel[];
  onStationSelect: (station: StationUIModel) => void;
  onClose: () => void;
  nextCharSuggestion?: string;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

export const useKeyboardNavigation = ({
  displayStations,
  onStationSelect,
  onClose,
  nextCharSuggestion,
  searchTerm,
  onSearchTermChange,
}: UseKeyboardNavigationProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (displayStations.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < displayStations.length - 1 ? prevIndex + 1 : prevIndex,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;

      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < displayStations.length) {
          onStationSelect(displayStations[highlightedIndex]);
        } else if (nextCharSuggestion && searchTerm) {
          onSearchTermChange(searchTerm + nextCharSuggestion);
        }
        break;

      case "Tab":
        if (nextCharSuggestion && searchTerm) {
          e.preventDefault();
          onSearchTermChange(searchTerm + nextCharSuggestion);
        }
        break;

      case "Escape":
        e.preventDefault();
        setHighlightedIndex(-1);
        onClose();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [displayStations.length]);

  return {
    highlightedIndex,
    setHighlightedIndex,
    handleKeyDown,
  };
};
