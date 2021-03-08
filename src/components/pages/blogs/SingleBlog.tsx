import React, { useContext } from 'react';
import { IBlog } from 'interfaces/blog';
import { AuthContext } from 'context/authContext';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';
import BlogOptions from './components/BlogOptions';
interface IProps {
  blog: IBlog;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(20),
  },
  imageContainer: {
    aspectRatio: '16:4',
  },
  image: {
    width: '100%',
  },
}));

const SingleBlog: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { title, image, description, createdAt } = props?.blog;
  return (
    <Container className={`${classes.root} card`}>
      {user.role === 'admin' && <BlogOptions blog={props.blog} />}
      <Grid item>
        {image ? (
          <Grid className={classes.imageContainer}>
            <img className={classes.image} src={image} />
          </Grid>
        ) : null}
        <Typography variant='h2'>{title && title} </Typography>
        <Typography variant='h5'>
          {' '}
          {moment(createdAt).fromNow().toUpperCase()}{' '}
        </Typography>
        <Typography variant='h4'>{description && description}</Typography>
      </Grid>
    </Container>
  );
};

export default SingleBlog;
