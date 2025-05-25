import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { StationUIModel } from "../../api/station";
import { type StationsState } from "../../context/StationsReducer";
import { StationsContext, type StationsContextValue } from "../../context/useStationsContext";
import { getStationData } from "../../mock-data/station-list";
import { clearMemoryStorage } from "../../utils/recentSearches";
import { StationCombobox } from "./StationCombobox";

const sampleStations = getStationData(5);

const sampleRecentStations: StationUIModel[] = [
  { name: "Recent Station 1", code: "RS1" },
  { name: "Recent Station 2", code: "RS2" },
];

// Create a mock version of the context value
const createMockContextState = (overrides?: Partial<StationsState>): StationsContextValue => ({
  stations: sampleStations,
  recentStations: [],
  searchTerm: "",
  filteredStations: sampleStations,
  searchableStations: sampleStations,
  availableNextChars: ["a", "b", "c"],
  nextCharSuggestion: "a",
  isLoading: false,
  error: null,
  isError: false,
  hasRecentStations: false,
  refetch: async () => ({}),
  setSearchTerm: () => {},
  selectStation: () => {},
  submitStation: () => {},
  clearSelectedStation: () => {},
  selectedStation: null,
  dispatch: () => {},
  ...overrides,
});

const StandardContextProvider = ({ children }: { children: ReactNode }) => {
  const mockState = createMockContextState({
    searchableStations: sampleStations,
  });

  return (
    <QueryClientProvider client={new QueryClient()}>
      <StationsContext.Provider value={mockState}>{children}</StationsContext.Provider>
    </QueryClientProvider>
  );
};

const EmptyContextProvider = ({ children }: { children: ReactNode }) => {
  const mockState = createMockContextState({
    stations: [],
    searchableStations: [],
    filteredStations: [],
  });

  return (
    <QueryClientProvider client={new QueryClient()}>
      <StationsContext.Provider value={mockState}>{children}</StationsContext.Provider>
    </QueryClientProvider>
  );
};

const LoadingContextProvider = ({ children }: { children: ReactNode }) => {
  const mockState = createMockContextState({
    isLoading: true,
    stations: [],
    searchableStations: [],
    filteredStations: [],
  });

  return (
    <QueryClientProvider client={new QueryClient()}>
      <StationsContext.Provider value={mockState}>{children}</StationsContext.Provider>
    </QueryClientProvider>
  );
};

const LoadingWithRecentContextProvider = ({ children }: { children: ReactNode }) => {
  const mockState = createMockContextState({
    isLoading: true,
    stations: [],
    searchableStations: sampleRecentStations,
    filteredStations: sampleRecentStations,
    recentStations: sampleRecentStations,
    hasRecentStations: true,
  });

  return (
    <QueryClientProvider client={new QueryClient()}>
      <StationsContext.Provider value={mockState}>{children}</StationsContext.Provider>
    </QueryClientProvider>
  );
};

const ErrorContextProvider = ({ children }: { children: ReactNode }) => {
  const mockState = createMockContextState({
    isError: true,
    error: "Failed to fetch stations",
    stations: [],
    searchableStations: [],
    filteredStations: [],
  });

  return (
    <QueryClientProvider client={new QueryClient()}>
      <StationsContext.Provider value={mockState}>{children}</StationsContext.Provider>
    </QueryClientProvider>
  );
};

const ErrorWithRecentContextProvider = ({ children }: { children: ReactNode }) => {
  const mockState = createMockContextState({
    isError: true,
    error: "Failed to fetch stations",
    stations: [],
    searchableStations: sampleRecentStations,
    filteredStations: sampleRecentStations,
    recentStations: sampleRecentStations,
    hasRecentStations: true,
  });

  return (
    <QueryClientProvider client={new QueryClient()}>
      <StationsContext.Provider value={mockState}>{children}</StationsContext.Provider>
    </QueryClientProvider>
  );
};

const meta: Meta<typeof StationCombobox> = {
  title: "StationSearch/StationCombobox",
  component: StationCombobox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
          A combobox component for selecting train stations. Features include:
          - Search functionality to filter stations
          - Keyboard navigation with arrow keys
          - Support for touch devices
          - Visual indication of selected station
          - Clear selection button
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onStationSelect: { action: "stationSelected" },
  },
  decorators: [
    (Story) => {
      // Clear memory storage before each story
      useEffect(() => {
        clearMemoryStorage();
      }, []);

      return (
        <div className="w-[300px] p-4 sm:w-[500px]">
          <StandardContextProvider>
            <Story />
          </StandardContextProvider>
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const createSampleStation = (index: number): StationUIModel => ({
  name: `Test Station ${index}`,
  code: `TS${index}`,
});

const SelectionDemo = ({ selected = null }: { selected?: StationUIModel | null }) => {
  const [selectedStation, setSelectedStation] = useState<StationUIModel | null>(selected);

  return (
    <StationCombobox
      stations={sampleStations}
      selectedStation={selectedStation}
      onStationSelect={(station) => setSelectedStation(station)}
      placeholder="Select a station..."
    />
  );
};

export const Default: Story = {
  render: () => <SelectionDemo />,
};

export const WithSelection: Story = {
  render: () => <SelectionDemo selected={createSampleStation(1)} />,
};

const StateDemo = () => {
  const [selectedStation, setSelectedStation] = useState<StationUIModel | null>(null);

  return (
    <StationCombobox
      stations={sampleStations}
      selectedStation={selectedStation}
      onStationSelect={(station) => setSelectedStation(station)}
      placeholder="Select a station..."
    />
  );
};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <div className="w-[300px] p-4 sm:w-[500px]">
        <LoadingContextProvider>
          <Story />
        </LoadingContextProvider>
      </div>
    ),
  ],
  render: () => <StateDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Shows the loading state when stations are being fetched and no recent stations are available.",
      },
    },
  },
};

export const LoadingWithRecentStations: Story = {
  decorators: [
    (Story) => (
      <div className="w-[300px] p-4 sm:w-[500px]">
        <LoadingWithRecentContextProvider>
          <Story />
        </LoadingWithRecentContextProvider>
      </div>
    ),
  ],
  render: () => <StateDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Shows the loading state when stations are being fetched but recent stations are available for immediate use.",
      },
    },
  },
};

export const Error: Story = {
  decorators: [
    (Story) => (
      <div className="w-[300px] p-4 sm:w-[500px]">
        <ErrorContextProvider>
          <Story />
        </ErrorContextProvider>
      </div>
    ),
  ],
  render: () => <StateDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Shows the error state when station fetching fails and no recent stations are available.",
      },
    },
  },
};

export const ErrorWithRecentStations: Story = {
  decorators: [
    (Story) => (
      <div className="w-[300px] p-4 sm:w-[500px]">
        <ErrorWithRecentContextProvider>
          <Story />
        </ErrorWithRecentContextProvider>
      </div>
    ),
  ],
  render: () => <StateDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Shows the error state when station fetching fails but recent stations are still available for use.",
      },
    },
  },
};

const EmptyStateDemo = () => {
  const [selectedStation, setSelectedStation] = useState<StationUIModel | null>(null);

  return (
    <StationCombobox
      stations={[]}
      selectedStation={selectedStation}
      onStationSelect={(station) => setSelectedStation(station)}
      placeholder="No stations available"
    />
  );
};

export const EmptyState: Story = {
  decorators: [
    (Story) => (
      <div className="w-[300px] p-4 sm:w-[500px]">
        <EmptyContextProvider>
          <Story />
        </EmptyContextProvider>
      </div>
    ),
  ],
  render: () => <EmptyStateDemo />,
  parameters: {
    docs: {
      description: {
        story: "Shows the empty state when no stations are available.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    stations: sampleStations,
    placeholder: "Select a station...",
    disabled: true,
  },
};
