import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import type { StationUIModel } from "../../api/station";
import { getStationData } from "../../mock-data/station-list";
import { clearMemoryStorage } from "../../utils/recentSearches";
import { StationCombobox } from "./StationCombobox";

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
        <div className="w-[350px] p-4">
          <Story />
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

  useEffect(() => {
    clearMemoryStorage();
  }, []);

  return (
    <StationCombobox
      stations={getStationData(5)}
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

export const EmptyState: Story = {
  args: {
    stations: [],
    placeholder: "No stations available",
  },
};

export const Disabled: Story = {
  args: {
    stations: getStationData(5),
    placeholder: "Select a station...",
    disabled: true,
  },
};
