import { FormControlLabel, Radio } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React from 'react';

type IRadioProps = { label: string } & FieldAttributes<{}>;

const CustomRadio: React.FC<IRadioProps> = ({ label, disabled, ...props }) => {
  const [field] = useField<{}>(props);
  return (
    <FormControlLabel
      control={<Radio />}
      label={label}
      {...field}
    ></FormControlLabel>
  );
};

export default CustomRadio;
