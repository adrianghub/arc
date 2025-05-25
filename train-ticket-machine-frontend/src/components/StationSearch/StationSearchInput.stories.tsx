import type { Meta, StoryFn } from "@storybook/react";
import { useEffect, useState } from "react";
import { useGhostText } from "../../hooks/useGhostText";
import { StationSearchInput } from "./StationSearchInput";

const meta = {
  title: "StationSearch/StationSearchInput",
  component: StationSearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: "400px" }}>{Story()}</div>],
} satisfies Meta<typeof StationSearchInput>;

export default meta;

const DefaultTemplate: StoryFn<typeof StationSearchInput> = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    ghostTextRef,
    measurementRef,
    inputRef: searchInputRef,
    updateGhostTextPosition,
  } = useGhostText({
    inputValue: searchTerm,
    suggestion: "",
  });

  return (
    <StationSearchInput
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchInputRef={searchInputRef}
      ghostTextRef={ghostTextRef}
      measurementRef={measurementRef}
      nextCharSuggestion={null}
      handleKeyDown={() => {}}
      updateGhostTextPosition={updateGhostTextPosition}
    />
  );
};

export const Default = {
  render: DefaultTemplate,
};

const WithGhostTextTemplate: StoryFn<typeof StationSearchInput> = () => {
  const [searchTerm, setSearchTerm] = useState("lond");

  const {
    ghostTextRef,
    measurementRef,
    inputRef: searchInputRef,
    updateGhostTextPosition,
  } = useGhostText({
    inputValue: searchTerm,
    suggestion: "on",
  });

  return (
    <StationSearchInput
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchInputRef={searchInputRef}
      ghostTextRef={ghostTextRef}
      measurementRef={measurementRef}
      nextCharSuggestion="on"
      handleKeyDown={() => {}}
      updateGhostTextPosition={updateGhostTextPosition}
    />
  );
};

export const WithGhostText = {
  render: WithGhostTextTemplate,
};

const InteractiveDemoTemplate: StoryFn<typeof StationSearchInput> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [nextCharSuggestion, setNextCharSuggestion] = useState<string | null>(null);

  const {
    ghostTextRef,
    measurementRef,
    inputRef: searchInputRef,
    updateGhostTextPosition,
  } = useGhostText({
    inputValue: searchTerm,
    suggestion: nextCharSuggestion || "",
  });

  // This simulates finding a suggestion based on input
  useEffect(() => {
    if (searchTerm === "l") {
      setNextCharSuggestion("ondon");
    } else if (searchTerm === "lo") {
      setNextCharSuggestion("ndon");
    } else if (searchTerm === "lon") {
      setNextCharSuggestion("don");
    } else if (searchTerm === "lond") {
      setNextCharSuggestion("on");
    } else if (searchTerm === "londo") {
      setNextCharSuggestion("n");
    } else {
      setNextCharSuggestion(null);
    }
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && nextCharSuggestion && !e.shiftKey) {
      e.preventDefault();
      const newValue = searchTerm + nextCharSuggestion;
      setSearchTerm(newValue);
    }
  };

  return (
    <>
      <p style={{ marginBottom: "10px", fontSize: "14px" }}>
        Try typing "l", "lo", "lon", etc. and press Tab to complete the suggestion
      </p>
      <StationSearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchInputRef={searchInputRef}
        ghostTextRef={ghostTextRef}
        measurementRef={measurementRef}
        nextCharSuggestion={nextCharSuggestion}
        handleKeyDown={handleKeyDown}
        updateGhostTextPosition={updateGhostTextPosition}
      />
    </>
  );
};

export const InteractiveDemo = {
  render: InteractiveDemoTemplate,
};
