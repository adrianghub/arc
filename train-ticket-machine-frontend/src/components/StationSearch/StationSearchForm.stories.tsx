import type { Meta, StoryObj } from "@storybook/react";
import StationSearchForm from "./StationSearchForm";

const meta: Meta<typeof StationSearchForm> = {
  title: "Components/StationSearchForm",
  component: StationSearchForm,
  parameters: {
    // Optional: an_action for logging events in the Storybook UI
    // an_action: { argTypesRegex: "^on[A-Z].*" },
    layout: "centered", // Centers the component in the Storybook canvas
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#121212" }],
    },
  },
  tags: ["autodocs"], // Enables automatic documentation generation
  argTypes: {
    // Define argTypes for props if your component accepts them
    // e.g., backgroundColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Default story for the StationSearchForm
export const Default: Story = {
  args: {},
};

// You can add more stories here for different states or variants, e.g.:
// export const WithInitialValue: Story = {
//   args: {
//     initialDepartureValue: 'London',
//   },
// };

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
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
