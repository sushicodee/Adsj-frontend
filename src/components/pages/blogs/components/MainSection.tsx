import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import SingleBlog from '../SingleBlog';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

interface Iprops {
  blogs: any;
  title: string;
  currentPage: number;
  perPage: number;
}

export default function MainSection(props: Iprops) {
  const classes = useStyles();
  const { blogs, title, currentPage, perPage } = props;
  // const start = (currentPage - 1) * perPage;
  // const end = start + perPage;
  return (
    <Grid item>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Divider />
      {blogs.map((blog: any) => {
        return <SingleBlog key={blog.id + 'blogs'} blog={blog} />;
      })}
    </Grid>
  );
}
