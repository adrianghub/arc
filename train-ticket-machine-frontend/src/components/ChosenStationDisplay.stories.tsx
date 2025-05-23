import type { Meta, StoryObj } from "@storybook/react";
import { ChosenStationDisplay } from "./ChosenStationDisplay";

const meta: Meta<typeof ChosenStationDisplay> = {
  title: "Components/ChosenStationDisplay",
  component: ChosenStationDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    station: {
      control: "object",
      description: "Station details to display",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithStation: Story = {
  args: {
    station: {
      name: "London Waterloo",
      code: "WAT",
    },
  },
};

export const LongStationName: Story = {
  render: () => (
    <div className="flex max-w-[400px] flex-col space-y-6 bg-gray-950 p-4">
      <ChosenStationDisplay
        station={{
          name: "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch",
          code: "LPG",
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how long station names are handled with proper wrapping and responsive text sizing.",
      },
    },
  },
};

export const NoStation: Story = {
  args: {
    station: null,
  },
  parameters: {
    docs: {
      description: {
        story: "When no station is provided, the component renders nothing.",
      },
    },
  },
};

export const MultipleExamples: Story = {
  render: () => (
    <div className="flex flex-col space-y-6">
      <ChosenStationDisplay
        station={{
          name: "London Paddington",
          code: "PAD",
        }}
      />
      <ChosenStationDisplay
        station={{
          name: "Birmingham New Street",
          code: "BHM",
        }}
      />
      <ChosenStationDisplay
        station={{
          name: "Edinburgh Waverley",
          code: "EDB",
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple examples showing different stations.",
      },
    },
  },
};

// Add a story to demonstrate different length station names
export const VariousNameLengths: Story = {
  render: () => (
    <div className="flex max-w-[400px] flex-col space-y-6">
      <ChosenStationDisplay
        station={{
          name: "York",
          code: "YRK",
        }}
      />
      <ChosenStationDisplay
        station={{
          name: "Newcastle upon Tyne",
          code: "NCL",
        }}
      />
      <ChosenStationDisplay
        station={{
          name: "Stratford-upon-Avon",
          code: "SAV",
        }}
      />
      <ChosenStationDisplay
        station={{
          name: "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch",
          code: "LPG",
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparing stations with varying name lengths, from short to very long.",
      },
    },
  },
};
