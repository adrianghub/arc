import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

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
    helpText: { control: "text" },
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
    label: "Your Name",
    placeholder: "E.g., Ada Lovelace",
  },
};

export const WithHelpText: Story = {
  args: {
    id: "input-with-help",
    label: "Email Address",
    type: "email",
    placeholder: "your@email.com",
    helpText: "We'll never share your email with anyone else",
  },
};

export const WithError: Story = {
  args: {
    id: "input-with-error",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    error: "Password must be at least 8 characters",
  },
};

export const TouchFriendly: Story = {
  args: {
    id: "touch-friendly-input",
    label: "Destination",
    placeholder: "Where are you going?",
    helpText: "Tap to select your destination",
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-input",
    label: "Disabled Input",
    placeholder: "Cannot type here",
    disabled: true,
  },
};

export const Search: Story = {
  args: {
    id: "search-input",
    type: "search",
    placeholder: "Search stations...",
    label: "Find Station",
  },
};
