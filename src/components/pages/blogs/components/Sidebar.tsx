import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary,
    },
  },
}));
interface IProps {
  archives: any;
  description: string;
  social: any;
  title: string;
}

const Sidebar: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { archives, description, social, title } = props;

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };
  return (
    <Grid item xs={12} md={4} className='glass-dark'>
      <Paper elevation={0} className={`${classes.sidebarAboutBox} card`}>
        <Typography variant='h6' gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      {/* <Typography variant='h6' gutterBottom className={classes.sidebarSection}>
        Archives
      </Typography> */}
      {/* {archives.map((archive: any) => (
        <Link
          display='block'
          variant='body1'
          href={archive.url}
          key={archive.title}
        >
          {archive.title}
        </Link>
      ))} */}
      <Typography variant='h6' gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>
      {social.map((network: any, indx: number) => (
        <div key={indx} className={classes.link}>
          <Grid
            container
            direction='row'
            spacing={1}
            alignItems='center'
            className={classes.link}
            onClick={() => openInNewTab(network.url)}
          >
            <Grid item>
              <network.icon />
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </div>
      ))}
    </Grid>
  );
};

export default Sidebar;
