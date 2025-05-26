import { useStatsigClient } from "@statsig/react-bindings";
import { NextCharVariant, useNextCharExperiment } from "../../hooks/useNextCharExperiment";

interface AvailableNextCharsProps {
  availableNextChars: string[];
  onCharSelect?: (char: string) => void;
}

export const AvailableNextChars = ({
  availableNextChars,
  onCharSelect,
}: AvailableNextCharsProps) => {
  const { isClickable, variant } = useNextCharExperiment();
  const { client } = useStatsigClient();

  if (availableNextChars.length === 0) {
    return null;
  }

  client?.logEvent("next_chars_displayed", "component_view", {
    variant,
    available_chars: availableNextChars.join(","),
    count: availableNextChars.length.toString(),
  });

  const handleCharClick = (char: string) => {
    if (!isClickable || !onCharSelect) return;

    client?.logEvent("next_char_selected", char, {
      variant: NextCharVariant.CLICKABLE,
    });

    onCharSelect(char);
  };

  return (
    <div className="bg-gray-850 border-b border-gray-700 px-3 py-2">
      <div className="mb-1 text-sm font-medium text-gray-300">Available next characters:</div>
      <div className="flex flex-wrap gap-2">
        {availableNextChars.map((char, index) => (
          <span
            key={index}
            className={`rounded bg-gray-800 px-3 py-2 text-base text-gray-300 ${
              isClickable ? "cursor-pointer hover:bg-gray-700" : ""
            }`}
            aria-disabled={!isClickable}
            onClick={() => handleCharClick(char)}
            role={isClickable ? "button" : "presentation"}
          >
            {char === " " ? "<space>" : char}
          </span>
        ))}
      </div>
    </div>
  );
};
