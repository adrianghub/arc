import { StationSearchForm } from "./components/StationSearch/StationSearchForm";

function App() {
  return (
    <div className='py-8 px-4 sm:px-6 md:py-12'>
      <header className='mb-10 md:mb-16 text-center'>
        <h1 className='text-4xl sm:text-5xl font-bold tracking-tight mb-4'>
          Train Ticket Machine
        </h1>
        <p className='mt-2 text-xl text-gray-300 max-w-2xl mx-auto'>
          Find and book your next train journey with ease
        </p>
      </header>
      <main className='w-full flex justify-center touch-manipulation'>
        <StationSearchForm />
      </main>
    </div>
  );
}

export default App;
