import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Form } from "./Form";
import { Input } from "./Input";

const meta: Meta<typeof Form> = {
  title: "Common/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    maxWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Maximum width of the form container",
    },
    onSubmit: { action: "submitted" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sample Form",
    maxWidth: "lg",
    children: (
      <>
        <Input id="email" label="Email" type="email" placeholder="Enter your email" />
        <Input id="password" label="Password" type="password" placeholder="Enter your password" />
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </>
    ),
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Create Account",
    children: (
      <>
        <Input id="name" label="Full Name" placeholder="Enter your full name" />
        <Input id="email" label="Email Address" type="email" placeholder="your@email.com" />
        <div className="flex justify-end">
          <Button type="submit">Register</Button>
        </div>
      </>
    ),
  },
};

export const TouchFriendly: Story = {
  args: {
    title: "Search Trains",
    maxWidth: "lg",
    children: (
      <>
        <Input id="from" label="From" placeholder="Departure station" />
        <Input id="to" label="To" placeholder="Arrival station" />
        <div className="flex justify-center">
          <Button type="submit" size="lg" fullWidth>
            Search
          </Button>
        </div>
      </>
    ),
  },
};

export const WideForm: Story = {
  args: {
    title: "Time Selection",
    subtitle: "Choose your preferred time",
    maxWidth: "xl",
    children: (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input id="departure-date" label="Departure Date" type="date" />
          <Input id="departure-time" label="Departure Time" type="time" />
        </div>
        <div className="flex justify-center">
          <Button type="submit" variant="primary">
            Confirm
          </Button>
        </div>
      </>
    ),
  },
};
