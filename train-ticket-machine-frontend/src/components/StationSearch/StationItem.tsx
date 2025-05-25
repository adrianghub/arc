import type { StationUIModel } from "../../api/station";
import { highlightStationText } from "../../utils/highlightStationText";

interface StationItemProps {
  station: StationUIModel;
  isSelected: boolean;
  searchTerm: string;
  isHighlighted: boolean;
  isRecent: boolean;
  onClick: () => void;
  "data-index"?: number;
}

export const StationItem = ({
  station,
  isSelected,
  searchTerm,
  isHighlighted,
  isRecent,
  onClick,
  "data-index": dataIndex,
}: StationItemProps) => {
  if (isSelected) {
    return null;
  }

  return (
    <div
      data-index={dataIndex}
      role="option"
      aria-selected={isHighlighted}
      onClick={onClick}
      className={`cursor-pointer px-3 py-2.5 ${
        isHighlighted ? "bg-gray-700" : "hover:bg-gray-700"
      }`}
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
};
