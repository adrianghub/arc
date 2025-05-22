import type { Meta, StoryObj } from "@storybook/react";
import { PlusSquare } from "lucide-react";
import { Button } from "./Button";

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
    layout: "centered",
  },
};

export const TouchFriendly: Story = {
  args: {
    children: "Touch Me",
    size: "lg",
    className: "mt-2",
  },
  parameters: {
    layout: "centered",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
    variant: "primary",
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => (
      <div className='flex flex-col gap-4 w-[350px]'>
        <div>
          <p className='mb-2 text-sm font-medium'>
            Primary - Enabled (for comparison)
          </p>
          <Button variant='primary'>Primary Button</Button>
        </div>
        <div>
          <p className='mb-2 text-sm font-medium'>Primary - Disabled</p>
          <Button variant='primary' disabled>
            Primary Button
          </Button>
        </div>
      </div>
    ),
  ],
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusSquare className='h-5 w-5 mr-2' />
        Add New
      </>
    ),
    variant: "primary",
  },
};
