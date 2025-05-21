import { useState } from "react";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";

const StationSearchForm = () => {
  const [station, setStation] = useState("");

  const handleStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search with the station data
    console.log("Searching for station:", station);
  };

  return (
    <Form
      title='Find Your Departure Station'
      subtitle='Tap to search for available stations'
      onSubmit={handleSubmit}
      maxWidth='lg'
      className='touch-manipulation'
    >
      <Input
        id='departure'
        name='departure'
        placeholder='Enter departure station...'
        aria-label='Departure Station'
        helpText='Start typing to see matching stations'
        autoComplete='off'
        value={station}
        onChange={handleStationChange}
      />
      <div className='flex justify-center pt-4'>
        <Button type='submit' size='lg' fullWidth disabled={!station.trim()}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          Search Stations
        </Button>
      </div>
    </Form>
  );
};

export default StationSearchForm;
