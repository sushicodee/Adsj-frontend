import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import moment from 'moment';
const useStyles = makeStyles({
  card: {
    display: 'flex',
    height: 220,
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});
interface IProps {
  post: any;
}
function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
}
const FeaturedPosts: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component='a' href='#'>
        <Card className={`${classes.card} card`}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component='h2' variant='h5'>
                FeaturedPost
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {post.title && post.title}{' '}
                {post.createdAt &&
                  moment(post.createdAt).fromNow().toUpperCase()}
              </Typography>
              <Typography variant='subtitle1' paragraph>
                {post.description && truncate(post.description, 100)}
              </Typography>
              <Typography variant='subtitle1' color='primary'>
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={post.image}
              title={post.imageTitle}
            />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default FeaturedPosts;
