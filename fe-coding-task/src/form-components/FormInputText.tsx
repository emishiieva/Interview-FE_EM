import { Controller } from "react-hook-form";
import { TextField } from '@mui/material';
import { FormInputProps } from "../types";

export const FormInputText = ({ name, control, label, defaultValue }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          id="link"
          defaultValue={defaultValue}
          disabled
        />
      )}
    />
  );
};
