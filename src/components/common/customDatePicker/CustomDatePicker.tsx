import React from 'react';
import { useField, FieldAttributes } from 'formik';
import { DatePicker } from '@material-ui/pickers';

type Props = {
  id: string;
  label: string;
  format: string;
  value: Date;
} & FieldAttributes<{}>;
const CustomDatePicker: React.FC<Props> = ({ id, label, format, ...props }) => {
  const [field] = useField<{}>(props);
  return <DatePicker id={id} label={label} format={format} {...field} />;
};

export default CustomDatePicker;
