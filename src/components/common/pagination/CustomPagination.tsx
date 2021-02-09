import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import classes from '*.module.css';
import { makeStyles, Theme } from '@material-ui/core';

interface IProps {
  count: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  currentPage: number;
}
const CustomPagination: React.FC<IProps> = ({
  count,
  handleChange,
  currentPage,
}) => {
  return (
    <Pagination
      className={'pagination'}
      count={count}
      page={currentPage}
      onChange={handleChange}
      color='primary'
    />
  );
};

export default CustomPagination;
