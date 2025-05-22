const stationNames: string[] = [];

for (let i = 1; i <= 60; i++) {
  stationNames.push(`Test Station ${i}`);
}

export const getStations = (count?: number): string[] => {
  return count ? stationNames.slice(0, count) : stationNames;
};
