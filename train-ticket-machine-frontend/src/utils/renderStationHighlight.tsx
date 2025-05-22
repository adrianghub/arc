/**
 * Renders a station name with the search term and next character highlighted
 * @param station The station name to render
 * @param searchTerm The current search term
 * @returns JSX with appropriate highlighting
 */
export function renderStationWithHighlight(station: string, searchTerm: string) {
  if (!searchTerm) return station;

  const lowerStation = station.toLowerCase();
  const lowerSearchTerm = searchTerm.toLowerCase();
  const matches: { start: number; end: number }[] = [];

  // Find all occurrences of the search term
  let index = lowerStation.indexOf(lowerSearchTerm);
  while (index !== -1) {
    matches.push({
      start: index,
      end: index + lowerSearchTerm.length,
    });
    index = lowerStation.indexOf(lowerSearchTerm, index + 1);
  }

  if (matches.length === 0) return station;

  // Build the highlighted result
  const result = [];
  let lastEnd = 0;

  for (let i = 0; i < matches.length; i++) {
    const { start, end } = matches[i];

    // Add text before match
    if (start > lastEnd) {
      result.push(station.substring(lastEnd, start));
    }

    // Add the matched text
    result.push(
      <span key={`match-${i}`} className="font-medium text-white">
        {station.substring(start, end)}
      </span>,
    );

    // Add the highlighted next character if it exists
    if (end < station.length) {
      const nextChar = station.charAt(end);
      // Only highlight alphanumeric characters
      if (/^[a-zA-Z0-9]$/.test(nextChar)) {
        result.push(
          <span key={`highlight-${i}`} className="font-semibold text-indigo-400">
            {nextChar}
          </span>,
        );
        lastEnd = end + 1;
      } else {
        result.push(nextChar);
        lastEnd = end + 1;
      }
    } else {
      lastEnd = end;
    }
  }

  // Add any remaining text
  if (lastEnd < station.length) {
    result.push(station.substring(lastEnd));
  }

  return <>{result}</>;
}
