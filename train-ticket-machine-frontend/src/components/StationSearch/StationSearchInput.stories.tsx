import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { StationSearchInput } from "./StationSearchInput";

const meta: Meta<typeof StationSearchInput> = {
  title: "StationSearch/SearchInput",
  component: StationSearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    onChange: { action: "changed" },
    placeholder: { control: "text" },
    className: { control: "text" },
    disabled: { control: "boolean" },
    "aria-expanded": { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic example with controlled component wrapper
const ControlledStationSearchInput = () => {
  const [value, setValue] = useState("");
  return (
    <StationSearchInput
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="Enter departure station"
    />
  );
};

export const Default: Story = {
  render: () => <ControlledStationSearchInput />,
};

export const Empty: Story = {
  args: {
    value: "",
    placeholder: "Search for stations...",
  },
};

export const WithValue: Story = {
  args: {
    value: "Stockholm",
    placeholder: "Enter departure station",
  },
};

export const Disabled: Story = {
  args: {
    value: "",
    placeholder: "Enter departure station",
    disabled: true,
  },
};
