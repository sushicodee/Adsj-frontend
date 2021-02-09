import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import pen from 'assets/portfolio/pen.jpg';
interface IProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      marginTop: theme.spacing(3),
      backgroundImage: `url(${pen})`,
      height: 'auto',
      width: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      top: 0,
      left: 0,
    },
    typography: {},
    card: {
      padding: theme.spacing(10),
    },
  })
);

const Measurements: React.FC<IProps> = (props) => {
  const initialState = {
    head: 55,
    shoulders: 13,
    neck: 43,
    chest: 173,
    waist: 83,
    hips: 123,
    wrist: 23,
    thigh: 43,
    knee: 21,
    ankle: 33,
    shoes: 42,
  };

  const [values, setvalues] = useState(initialState);
  const [unit, setunit] = useState('cm');
  const classes = useStyles();
  const handleUnitChange = () => {
    if (unit === 'cm') {
      Object.keys(values).map((key) =>
        setvalues((pre) => ({ ...pre, [key]: +pre[key] / 2.54 }))
      );
      setunit('inches');
    } else {
      setunit('cm');
      setvalues(initialState);
    }
  };
  return (
    <Grid
      sm={12}
      md={2}
      onClick={handleUnitChange}
      className={`${classes.root} `}
    >
      <Grid item className={`${classes.card} glass-dark`}>
        <Typography variant='h5'>Measurements</Typography>
        {Object.keys(values).map((key) => {
          return (
            <Typography classsName={classes.typography}>
              {' '}
              {key.charAt(0).toUpperCase() + key.slice(1)} :{' '}
              {values[key].toFixed(2)} {unit}
            </Typography>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Measurements;
