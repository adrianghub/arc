import type { Meta, StoryObj } from "@storybook/react";
import { ErrorDisplay } from "./ErrorDisplay";

const meta: Meta<typeof ErrorDisplay> = {
  title: "Common/ErrorDisplay",
  component: ErrorDisplay,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
          Error display component that shows error messages with a retry option.
          Used throughout the application to provide consistent error handling.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "text",
      description: "The error to display. Can be an Error object, string, or any value.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the component.",
    },
    onRetry: {
      action: "retried",
      description: "Function to call when the retry button is clicked.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: "Failed to load data. Please try again.",
  },
};

export const WithErrorObject: Story = {
  args: {
    error: new Error("API request failed with status 404"),
  },
};

export const WithRetryFunction: Story = {
  args: {
    error: "Connection failed. Check your network and try again.",
    onRetry: () => console.log("Retry action triggered"),
  },
};

export const CustomStyling: Story = {
  args: {
    error: "Something went wrong.",
    className: "border-2 border-red-800 shadow-lg",
  },
};

export const LongErrorMessage: Story = {
  args: {
    error:
      "This is a very long error message that might wrap to multiple lines. It contains detailed information about what went wrong and possibly some suggestions for how to fix the issue. Users should be able to read this clearly.",
  },
};
