import type { Meta, StoryObj } from "@storybook/react";
import { StationSearchForm } from "./StationSearchForm";

const meta: Meta<typeof StationSearchForm> = {
  title: "StationSearch/StationSearchForm",
  component: StationSearchForm,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
    docs: {
      description: {
        component: `
          ## Station Search Form
          This form allows users to search for a train station with enhanced suggestion features.

          ### Key Features:
          - Accessible keyboard navigation with arrow keys and Enter
          - Inline suggestion (ghost text) for the next character
          - Highlighted next characters in the result list
          - Dedicated suggestions header showing available next characters
          - Touch-friendly interaction
          - A/B Testing with two suggestion variants:
            - Variant A: Clickable character pills
            - Variant B: Non-clickable informational display

          ### Usage Instructions:
          1. Type to see station suggestions and next character predictions
          2. Use Tab or Enter to accept suggested characters
          3. Use arrow keys or mouse to select a station
          4. Selected station stays highlighted for clarity
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto flex w-full max-w-screen-lg justify-center px-2 py-2 sm:px-4 sm:py-4 md:px-8 md:py-8">
        <div className="w-full sm:w-[500px] md:w-[650px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithClickableSuggestions: Story = {
  args: {
    suggestionsVariant: "clickable",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Variant A: Uses clickable character pills that users can tap to append to their search input.",
      },
    },
  },
};

export const WithNonClickableSuggestions: Story = {
  args: {
    suggestionsVariant: "non-clickable",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Variant B: Uses non-clickable character pills that only serve as an informational display.",
      },
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const Responsive: Story = {};
