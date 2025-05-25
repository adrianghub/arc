import { useState } from "react";
import type { StationUIModel } from "./api/station";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ChosenStationDisplay } from "./components/StationSearch/ChosenStationDisplay";
import { StationSearchForm } from "./components/StationSearch/StationSearchForm";
import { useStationsContext } from "./context/useStationsContext";

function App() {
  const { selectedStation, submitStation, clearSelectedStation } = useStationsContext();
  const [submittedStation, setSubmittedStation] = useState<StationUIModel | null>(null);

  const handleSubmit = () => {
    if (selectedStation) {
      submitStation(selectedStation);
      setSubmittedStation(selectedStation);
      clearSelectedStation();
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6 md:py-12">
      <header className="mb-10 text-center md:mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Train Ticket Machine</h1>
      </header>
      <main className="flex w-full touch-manipulation flex-col items-center justify-center">
        <ErrorBoundary>
          <StationSearchForm onSubmit={handleSubmit} />
          <ChosenStationDisplay station={submittedStation} />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
