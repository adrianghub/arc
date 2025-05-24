import type { Meta, StoryObj } from "@storybook/react";
import { LoadingIndicator } from "./LoadingIndicator";

const meta: Meta<typeof LoadingIndicator> = {
  title: "Common/LoadingIndicator",
  component: LoadingIndicator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
          A spinner component to indicate loading states.
          Can be customized with different sizes and styling.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "range", min: 12, max: 64, step: 4 },
      description: "The size of the loading spinner in pixels.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the component.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 24,
  },
};

export const Small: Story = {
  args: {
    size: 16,
  },
};

export const Large: Story = {
  args: {
    size: 48,
  },
};

export const CustomColor: Story = {
  args: {
    size: 32,
    className: "text-indigo-500",
  },
};

export const WithContainer: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-8">
      <LoadingIndicator size={32} />
      <p className="mt-2 text-gray-600">Loading content...</p>
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <LoadingIndicator size={16} className="text-indigo-600" />
      <span className="text-indigo-800">Looking for stations...</span>
    </div>
  ),
};
