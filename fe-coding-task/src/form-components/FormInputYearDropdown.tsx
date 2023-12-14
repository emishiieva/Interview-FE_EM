import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../types";
import { YEARS } from "../constants";

const FormInputYearDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  defaultValue,
}) => {
  const getMappedOptions = () => {
    return YEARS.map((year: string) => {
      return (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size={"small"}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value || defaultValue} displayEmpty>
            {getMappedOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
 
export default FormInputYearDropdown;