import React from "react";
import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";

type Variant =  'standard' | 'filled' |'outlined'

type ItextProps = {
  label: string;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  variant?: Variant;
} & FieldAttributes<{}>;

const CustomTextField: React.FC<ItextProps> = ({
  rows,
  placeholder,
  label,
  multiline,
  fullWidth,
  variant,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      variant = {variant}
      rows={rows} 
      multiline={multiline}
      placeholder={placeholder}
      fullWidth={fullWidth}
      label={label}
      error={!!errorText}
      helperText={errorText}
      {...field}
    />
  );
};

export default CustomTextField;