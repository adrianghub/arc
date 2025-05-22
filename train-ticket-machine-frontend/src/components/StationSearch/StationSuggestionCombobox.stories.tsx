import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { getStations } from "../../dummy-data/station-list";
import { StationSuggestionCombobox } from "./StationSuggestionCombobox";

const meta: Meta<typeof StationSuggestionCombobox> = {
  title: "StationSearch/StationSuggestionCombobox",
  component: StationSuggestionCombobox,
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
    (Story) => (
      <div className='p-4 w-[350px]'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const SelectionDemo = ({ selected = null }: { selected?: string | null }) => {
  const [selectedStation, setSelectedStation] = useState(selected);

  return (
    <StationSuggestionCombobox
      stations={getStations(5)}
      selectedStation={selectedStation}
      onStationSelect={(station) => setSelectedStation(station || "")}
      placeholder='Select a station...'
    />
  );
};

export const Default: Story = {
  render: () => <SelectionDemo />,
};

export const WithSelection: Story = {
  render: () => <SelectionDemo selected='Test Station 1' />,
};

export const EmptyState: Story = {
  args: {
    stations: [],
    placeholder: "No stations available",
  },
};

export const Disabled: Story = {
  args: {
    stations: getStations(5),
    placeholder: "Select a station...",
    disabled: true,
  },
};
