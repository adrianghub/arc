import React from "react";
import type { InputProps } from "../common/Input";
import { Input } from "../common/Input";

interface StationSearchInputProps extends Omit<InputProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export const StationSearchInput: React.FC<StationSearchInputProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Enter departure station"
        value={value}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};
