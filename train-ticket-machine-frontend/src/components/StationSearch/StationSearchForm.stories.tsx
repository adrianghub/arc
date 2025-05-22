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
          This form allows users to search for a train station.

          ### Key Features:
          - Accessible keyboard navigation with arrow keys and Enter
          - Highlights the selected station
          - Touch-friendly interaction

          ### Usage Instructions:
          1. Type to see station suggestions
          2. Use arrow keys or mouse to select a station
          3. Selected station stays highlighted for clarity
          4. Type again to see more suggestions, with your selection still highlighted
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className='max-w-screen-lg w-full mx-auto px-2 sm:px-4 md:px-8 py-2 sm:py-4 md:py-8 flex justify-center'>
        <div className='w-full sm:w-[500px] md:w-[650px]'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

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
