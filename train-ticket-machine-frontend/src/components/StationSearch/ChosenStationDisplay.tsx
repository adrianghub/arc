import type { StationUIModel } from "../../api/station";

export const ChosenStationDisplay = ({ station }: { station: StationUIModel | null }) => {
  if (!station) return null;

  return (
    <div className="mt-6 w-full max-w-lg rounded-lg bg-gray-800 p-4 text-center">
      <div className="flex flex-col">
        <p className="mb-1 text-lg text-white">Chosen departure station:</p>
        <p className="text-base font-semibold break-words text-indigo-400 sm:text-lg">
          {station.name}
        </p>
        <p className="font-mono text-indigo-300">({station.code})</p>
      </div>
    </div>
  );
};
