import { StationSearchForm } from "./components/StationSearch/StationSearchForm";

function App() {
  return (
    <div className="px-4 py-8 sm:px-6 md:py-12">
      <header className="mb-10 text-center md:mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Train Ticket Machine</h1>
      </header>
      <main className="flex w-full touch-manipulation justify-center">
        <StationSearchForm />
      </main>
    </div>
  );
}

export default App;
