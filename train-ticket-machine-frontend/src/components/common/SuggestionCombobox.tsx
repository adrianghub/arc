import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./Input";

export interface SuggestionComboboxProps<T> {
  suggestions: T[];
  getOptionLabel: (option: T) => string;
  onSelect: (option: T) => void;
  selectedOption?: T | null;
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  renderOption?: (
    option: T,
    isSelected: boolean,
    isHighlighted: boolean
  ) => React.ReactNode;
}

export function SuggestionCombobox<T>({
  suggestions,
  getOptionLabel,
  onSelect,
  selectedOption,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  noResultsMessage = "No matching options found",
  className = "",
  id,
  disabled = false,
  renderOption,
}: SuggestionComboboxProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<T[]>(suggestions);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSuggestions(suggestions);
    } else {
      const filtered = suggestions.filter((option) =>
        getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }

    setHighlightedIndex(-1);
  }, [searchTerm, suggestions, getOptionLabel]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listboxRef.current) {
      const listbox = listboxRef.current;
      const highlightedOption = listbox.querySelector(
        `[data-index="${highlightedIndex}"]`
      ) as HTMLElement;

      if (highlightedOption) {
        const listboxRect = listbox.getBoundingClientRect();
        const optionRect = highlightedOption.getBoundingClientRect();

        if (optionRect.bottom > listboxRect.bottom) {
          listbox.scrollTop += optionRect.bottom - listboxRect.bottom;
        } else if (optionRect.top < listboxRect.top) {
          listbox.scrollTop -= listboxRect.top - optionRect.top;
        }
      }
    }
  }, [highlightedIndex]);

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

  const handleOptionSelect = (option: T) => {
    onSelect(option);
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
    onSelect(null as T);
    setSearchTerm("");

    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;

      case "Enter":
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredSuggestions.length
        ) {
          handleOptionSelect(filteredSuggestions[highlightedIndex]);
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

  const selectedLabel = selectedOption ? getOptionLabel(selectedOption) : "";

  return (
    <div className={`relative ${className}`}>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            type='button'
            ref={triggerRef}
            onClick={handleToggle}
            className={`flex items-center justify-between w-full min-h-[56px] px-4 py-3 text-left rounded-lg border bg-gray-700 text-base sm:text-lg ${
              selectedOption
                ? "border-indigo-500 text-white"
                : "border-gray-600 text-gray-400"
            }`}
            aria-haspopup='listbox'
            aria-expanded={isOpen}
            id={id}
            disabled={disabled}
          >
            <span className='truncate'>{selectedLabel || placeholder}</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>
        </Popover.Trigger>

        <Popover.Content
          className='bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-700 data-[side=bottom]:mt-1 max-w-[95vw] sm:max-w-[85vw] md:max-w-none p-0 overflow-hidden'
          sideOffset={5}
          align='start'
          style={{ width: "var(--radix-popover-trigger-width)" }}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div className='flex flex-col'>
            {/* Search input */}
            <div className='p-2 border-b border-gray-700 relative'>
              <div className='relative'>
                <Search className='h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <Input
                  type='text'
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleKeyDown}
                  ref={searchInputRef}
                  className='bg-gray-900 border-gray-700 pl-10 py-2 text-sm mb-0'
                  autoComplete='off'
                />
              </div>
            </div>

            {/* Suggestions list */}
            <div
              className='max-h-[300px] overflow-y-auto'
              ref={listboxRef}
              role='listbox'
              aria-labelledby={id}
              tabIndex={-1}
              onKeyDown={handleKeyDown}
            >
              {selectedOption && (
                <div
                  className='px-3 py-2.5 border-b border-gray-600 flex justify-between items-center hover:bg-gray-700 cursor-pointer'
                  onClick={handleClearSelection}
                  ref={selectedItemRef}
                  tabIndex={0}
                  role='button'
                  aria-pressed='true'
                  onKeyDown={handleSelectedItemKeyDown}
                >
                  <div className='flex items-center'>
                    <Check className='h-5 w-5 mr-2 text-indigo-400' />
                    <span className='text-indigo-200 font-medium'>
                      {selectedLabel}
                    </span>
                  </div>
                  <X className='h-5 w-5 text-gray-400' />
                </div>
              )}

              {filteredSuggestions.length > 0 ? (
                <div>
                  {filteredSuggestions.map((option, index) => {
                    const isHighlighted = index === highlightedIndex;
                    const isSelected = selectedOption
                      ? getOptionLabel(option) ===
                        getOptionLabel(selectedOption)
                      : false;

                    if (isSelected && selectedOption) {
                      return null;
                    }

                    return (
                      <div
                        key={index}
                        data-index={index}
                        role='option'
                        aria-selected={isHighlighted || isSelected}
                        onClick={() => handleOptionSelect(option)}
                        className={`px-3 py-2.5 cursor-pointer ${
                          isHighlighted ? "bg-gray-700" : ""
                        } ${
                          isSelected
                            ? "text-indigo-200 bg-indigo-900/50 font-medium"
                            : "text-gray-200 hover:bg-gray-700"
                        } ${
                          index < filteredSuggestions.length - 1
                            ? "border-b border-gray-700/50"
                            : ""
                        }`}
                        tabIndex={-1}
                      >
                        {renderOption ? (
                          renderOption(option, isSelected, isHighlighted)
                        ) : (
                          <div className='flex items-center'>
                            {isSelected && (
                              <Check className='h-5 w-5 mr-2 text-indigo-400' />
                            )}
                            {getOptionLabel(option)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className='px-3 py-4 text-gray-400 text-center'>
                  {noResultsMessage}
                </div>
              )}
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>

      {selectedOption && !isOpen && (
        <button
          type='button'
          className='sr-only'
          aria-label={`Remove selection: ${selectedLabel}`}
          tabIndex={0}
          onClick={handleClearSelection}
          onKeyDown={handleSelectedItemKeyDown}
        >
          Clear selection
        </button>
      )}
    </div>
  );
}
