import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
    },
    fullWidth: {
      control: "boolean",
      description:
        "Whether the button should take up the full width of its container",
    },
    onClick: { action: "clicked" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "danger",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
    variant: "primary",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
    variant: "primary",
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
    size: "lg",
  },
  parameters: {
    layout: "padded",
  },
};

export const TouchFriendly: Story = {
  args: {
    children: "Touch Me",
    size: "lg",
    className: "mt-2",
  },
  parameters: {
    layout: "padded",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
          />
        </svg>
        Add New
      </>
    ),
    variant: "primary",
  },
};
