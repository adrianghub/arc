import type { Meta, StoryObj } from "@storybook/react";
import { Check } from "lucide-react";
import React from "react";
import { SuggestionCombobox } from "./SuggestionCombobox";

interface TestItem {
  id: number;
  name: string;
  value: string;
}

const TEST_ITEMS: TestItem[] = [
  { id: 1, name: "Test Station 1", value: "test1" },
  { id: 2, name: "Test Station 2", value: "test2" },
  { id: 3, name: "Test Station 3", value: "test3" },
  { id: 4, name: "Test Station 4", value: "test4" },
  { id: 5, name: "Test Station 5", value: "test5" },
];

const TEST_STRINGS = [
  "Test Station 1",
  "Test Station 2",
  "Test Station 3",
  "Test Station 4",
  "Test Station 5",
];

const meta: Meta<typeof SuggestionCombobox> = {
  title: "Common/SuggestionCombobox",
  component: SuggestionCombobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onSelect: { action: "selected" },
  },
  decorators: [
    (Story) => (
      <div className="w-[350px] p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithStrings: Story = {
  args: {
    suggestions: TEST_STRINGS,
    getOptionLabel: (item: string) => item,
    placeholder: "Select test",
    searchPlaceholder: "Search test...",
  },
};

const SelectionStateDemo = () => {
  const [selected, setSelected] = React.useState("Test Station 2");

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded border border-gray-600 bg-gray-800 p-2">
        <h3 className="mb-2 font-medium text-white">Selected: {selected || "None"}</h3>
        <SuggestionCombobox
          suggestions={TEST_STRINGS}
          getOptionLabel={(item: string) => item}
          selectedOption={selected}
          onSelect={(option) => setSelected(option as string)}
          placeholder="Select test"
          searchPlaceholder="Search test..."
        />
      </div>
      <div className="text-sm text-gray-300">
        <ul className="list-disc pl-5">
          <li>Selected value appears in the button</li>
          <li>In dropdown, the selected item has:</li>
          <ul className="list-circle pl-5">
            <li>A checkmark icon</li>
            <li>Indigo background</li>
            <li>Bold text</li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export const WithSelectedValue: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shows how a selected value appears in both the trigger button and the dropdown list with proper visual indication.",
      },
    },
  },
  render: () => <SelectionStateDemo />,
};

export const WithObjects: Story = {
  args: {
    suggestions: TEST_ITEMS,
    getOptionLabel: (item: TestItem) => item.name,
    placeholder: "Select test",
    searchPlaceholder: "Search test...",
  },
};

export const WithCustomRendering: Story = {
  args: {
    suggestions: TEST_ITEMS,
    getOptionLabel: (item: TestItem) => item.name,
    placeholder: "Select test",
    searchPlaceholder: "Search test...",
    renderOption: (item: TestItem, isSelected: boolean, isHighlighted: boolean) => (
      <div className={`flex items-center ${isHighlighted ? "bg-gray-700" : ""}`}>
        {isSelected && <Check className="mr-2 h-5 w-5 text-indigo-400" />}
        <div className="flex flex-col">
          <span className={`font-medium ${isSelected ? "text-indigo-200" : ""}`}>{item.name}</span>
          <span className="text-xs text-gray-400">{item.value}</span>
        </div>
      </div>
    ),
  },
};
