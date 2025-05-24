interface AvailableNextCharsProps {
  availableNextChars: string[];
}

export const AvailableNextChars = ({ availableNextChars }: AvailableNextCharsProps) => {
  if (availableNextChars.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-850 border-b border-gray-700 px-3 py-2">
      <div className="mb-1 text-sm font-medium text-gray-300">Available next characters:</div>
      <div className="flex flex-wrap gap-2">
        {availableNextChars.map((char, index) => (
          <span
            key={index}
            className="rounded bg-gray-800 px-3 py-2 text-base text-gray-300"
            aria-disabled="true"
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};
