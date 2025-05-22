import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Common/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    id: { control: "text" },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search"],
    },
    placeholder: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
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

export const Default: Story = {
  args: {
    id: "default-input",
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    id: "input-with-label",
    label: "Station Name",
    placeholder: "E.g., Test Station",
  },
};

export const WithError: Story = {
  args: {
    id: "input-with-error",
    label: "Station Name",
    type: "password",
    placeholder: "E.g., Test Station",
    error: "Station name must be at least 3 characters",
  },
};

export const TouchFriendly: Story = {
  args: {
    id: "touch-friendly-input",
    label: "Destination",
    placeholder: "E.g., Test Station",
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-input",
    label: "Disabled Input",
    placeholder: "E.g., Test Station",
    disabled: true,
  },
};

export const Search: Story = {
  args: {
    id: "search-input",
    type: "search",
    placeholder: "Search station...",
    label: "Find Station",
  },
};
