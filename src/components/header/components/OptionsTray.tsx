import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'context/authContext';
import { Avatar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { axiosApi } from 'axios/axiosApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: '4px',
      backgroundColor: 'black',
    },
  })
);

interface IProps {}
const OptionsTray: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { userProfile, fetchProfile } = useContext(AuthContext);
  useEffect(() => {
    fetchProfile();
  }, []);
  return userProfile ? (
    <Avatar alt={userProfile.name} src={userProfile.image}>
      {' '}
    </Avatar>
  ) : (
    <Avatar className={classes.avatar}>
      <AccountCircleIcon />
    </Avatar>
  );
};

export default OptionsTray;
