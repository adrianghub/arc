import { ChevronDown } from "lucide-react";
import type { StationUIModel } from "../../api/station";

interface StationComboboxTriggerButtonProps {
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  isOpen: boolean;
  selectedStation: StationUIModel | null | undefined;
  placeholder: string;
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const StationComboboxTriggerButton = ({
  triggerRef,
  isOpen,
  selectedStation,
  placeholder,
  id,
  disabled = false,
  onClick,
}: StationComboboxTriggerButtonProps) => {
  return (
    <button
      type="button"
      ref={triggerRef}
      onClick={onClick}
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
  );
};
