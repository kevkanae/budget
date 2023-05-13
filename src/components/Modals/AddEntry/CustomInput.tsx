import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { FormType } from "./AddEntry.hook";

interface Props {
  name: keyof FormType;
  control: any;
  placeholder: string;
  type: string;
  required?: boolean;
  fullWidth?: boolean;
}

const CustomInput = ({
  name,
  control,
  required = false,
  placeholder,
  type,
  fullWidth = true,
}: Props) => (
  <Controller
    name={name}
    control={control}
    rules={{ required: required, min: 0 }}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        InputProps={{ inputProps: { min: "0", max: "10", step: "1" } }}
        fullWidth={fullWidth}
        sx={{
          width: fullWidth ? "100%" : "48%",
        }}
        error={!!error}
      />
    )}
  />
);

export default CustomInput;
