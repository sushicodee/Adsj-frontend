import React from 'react';
import { useField, FieldAttributes } from 'formik';
import { Checkbox, FormControlLabel } from '@material-ui/core';

type Props = { label: string } & FieldAttributes<{}>;
const CustomCheckBox: React.FC<Props> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return (
    <FormControlLabel
      control={<Checkbox />}
      label={label}
      {...field}
    ></FormControlLabel>
  );
};

export default CustomCheckBox;
