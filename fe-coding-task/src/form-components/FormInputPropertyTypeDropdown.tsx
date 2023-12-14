import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../types";

const options = [
  {
    label: "Boliger",
    value: "00",
  },
  {
    label: "Småhus",
    value: "02",
  },
  {
    label: "Blokkleiligheter",
    value: "03",
  },
];

const FormInputPropertyTypeDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  defaultValue
}) => {
  const getMappedOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };
  let opa: any;

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
 
export default FormInputPropertyTypeDropdown;