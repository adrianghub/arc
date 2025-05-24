import { Check, X } from "lucide-react";
import React from "react";

interface SelectedStationItemProps {
  selectedStation: string;
  onClearSelection: (e?: React.MouseEvent | React.KeyboardEvent) => void;
}

export const SelectedStationItem = ({
  selectedStation,
  onClearSelection,
}: SelectedStationItemProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        onClearSelection(e);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="flex cursor-pointer items-center justify-between border-b border-gray-600 px-3 py-2.5 hover:bg-gray-700"
      onClick={onClearSelection}
      tabIndex={0}
      role="button"
      aria-pressed="true"
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center">
        <Check className="mr-2 h-5 w-5 text-indigo-400" />
        <span className="font-medium text-indigo-200">{selectedStation}</span>
      </div>
      <X className="h-5 w-5 text-gray-400" />
    </div>
  );
};
