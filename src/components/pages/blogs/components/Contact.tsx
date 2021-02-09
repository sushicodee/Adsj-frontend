import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ContactImage from 'assets/portfolio/contact.JPG';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  contactImage: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundPositionY: '0px',
    backgroundPositionX: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  contactImageContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

interface Iprops {
  history: any;
}
const Contact: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { history } = props;
  return (
    <Grid item xs={12}>
      <Paper
        className={classes.contactImage}
        style={{ backgroundImage: `url(${ContactImage})` }}
      >
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.contactImageContent}>
              <Typography
                component='h1'
                variant='h3'
                color='inherit'
                gutterBottom
              >
                VIEW MY PORTFOLIO
              </Typography>
              <Typography variant='h5' color='inherit' paragraph>
                CLICK TO VIEW MY LATEST WORK AND PROJECTS. OVER THE COURSE OF 5
                YEARS I HAVE WORKED ACROSS DIVERSE CAMPAIGNS IN FASHION, RUNWAY,
                EDITORIAL, LIFESTYLE, AND COMMERCIAL ASSIGNMENTS.
              </Typography>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => history.push('/portfolio')}
              >
                SEE MY PORTFOLIO
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Contact;
