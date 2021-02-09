import React from 'react';
import {
  Grid,
  Container,
  makeStyles,
  createStyles,
  Card,
  CardMedia,
  Typography,
} from '@material-ui/core';
import profileImage from 'assets/portfolio/timeline.jpg';
import timelineImage from 'assets/portfolio/homeProfile.jpg';
import Measurements from './components/Measurements';
import Sidebar from '../blogs/components/Sidebar';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Contact from '../contact/Contact';
interface IProps {
  history: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    card: {},
    media: {
      //   backgroundPositionX: 250,
      backgroundColor: 'white',
      height: 500,
      width: '100%',
      aspectRatio: '16:4',
      backgroundPositionY: -10,
    },
    title: {
      top: 64,
      position: 'fixed',
      zIndex: 10,
    },
  })
);

const sidebar = {
  title: 'About',
  description:
    'Ayushman Joshi (born 17 December 1993), also known as Ayushman DS Joshi and Ayushman Desraj Shrestha Joshi is a Nepalese Film Actor/Model/VJ. He started his career as a VJ from programs "Hollybollywood” and “Global Beats" on Kantipur Television, and debuted as an actor from film Chapali height 2 which was average success. Beside this he has appeared in cameo role in Industry Hit Chakka Panja 2, lead actor in multistarrer Katha Kathmandu(2018) and successful movie Changa Chett(2018). Joshi is the winner of Face of House of Fashion En Vogue 2015, which was held at Hotel Radisson, Nepal. He is married to popular actress Priyanka Karki.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    {
      name: 'Instagram',
      icon: InstagramIcon,
      url: 'https://www.instagram.com/ayushmandsj/',
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: 'https://www.facebook.com/ayushman.joshi.12',
    },
    { name: 'Twitter', icon: TwitterIcon, url: '' },
  ],
};

const Portfolio = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='lg' className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={timelineImage}
              title='ADSJ-Timeline'
            >
              <Typography
                variant='h4'
                className={`${classes.title} glass-dark`}
              >
                Ayushman DSK Joshi
              </Typography>
            </CardMedia>
          </Card>
        </Grid>
        <Grid container spacing={5}>
          <Measurements />
          <Contact />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Portfolio;
