import React from "react";
import type { InputProps } from "../common/Input";
import { Input } from "../common/Input";

interface StationSearchInputProps extends Omit<InputProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  helpText?: string;
}

const StationSearchInput: React.FC<StationSearchInputProps> = ({
  value,
  onChange,
  helpText,
  ...rest
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className='w-full'>
      <Input
        type='text'
        placeholder='Enter departure station'
        value={value}
        onChange={handleChange}
        {...rest}
      />
      {helpText && <div className='mt-1 text-xs text-gray-400'>{helpText}</div>}
    </div>
  );
};

export default StationSearchInput;
