export const highlightStationText = (station: string, searchTerm: string): React.ReactNode => {
  if (!searchTerm || station.length === 0) {
    return station;
  }

  const lowerStation = station.toLowerCase();
  const lowerSearchTerm = searchTerm.toLowerCase();

  const searchIndex = lowerStation.indexOf(lowerSearchTerm);
  if (searchIndex === -1) {
    return station;
  }

  const nextCharIndex = searchIndex + searchTerm.length;

  if (nextCharIndex >= station.length) {
    return station;
  }

  const beforeMatch = station.substring(0, searchIndex);
  const match = station.substring(searchIndex, nextCharIndex);
  const nextChar = station[nextCharIndex];
  const afterNextChar = station.substring(nextCharIndex + 1);

  return (
    <span style={{ whiteSpace: "pre" }}>
      {beforeMatch}
      {match}
      <span
        style={{
          color: "#8b5cf6",
          fontWeight: "bold",
        }}
      >
        {nextChar}
      </span>
      {afterNextChar}
    </span>
  );
};
