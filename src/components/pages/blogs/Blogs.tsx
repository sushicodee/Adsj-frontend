import {
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
} from '@material-ui/core';
import React, { useContext, useEffect, useState, useRef } from 'react';
import MainFeaturedPost from './components/mainFeaturedPost';
import featuredImage from 'assets/portfolio/image1.JPG';
import FeaturedPosts from './components/FeaturedPosts';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MainSection from './components/MainSection';
import Sidebar from './components/Sidebar';
import Contact from './components/Contact';
import {
  fetchBlogs,
  fetchFeaturedBlogs,
  fetchMainFeaturedBlog,
  setCurrentPage,
} from 'redux/actions/blog/blogAction';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'context/authContext';
import BlogFormCard from './components/BlogFormCard';
import CustomPagination from 'components/common/pagination/CustomPagination';
import { ProgressBar } from 'react-toastify/dist/components';
interface IProps {
  history: any;
  location: any;
  match: any;
}

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

const posts = [{}, {}, {}];
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const Blogs: React.FC<IProps> = (props) => {
  const blogsRef = useRef();
  const blog = useSelector((state) => state.blog);
  const {
    featuredBlogs,
    mainFeaturedBlog,
    blogs,
    currentPage,
    perPage,
    blogsCount,
    isBlogsProgress,
    isFeaturedprogress,
  } = blog;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!featuredBlogs.length) {
      // dispatch(fetchFeaturedBlogs());
      // dispatch(fetchMainFeaturedBlog());
    }
  }, []);

  useEffect(() => {
    // if (!cachedPages.includes(currentPage)) {
    // dispatch(fetchBlogs(currentPage, perPage));
    // }
  }, [currentPage, perPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setCurrentPage(value));
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg'>
        <main>
          <MainFeaturedPost post={mainFeaturedBlog} />
          {user && user.role === 'admin' && (
            <BlogFormCard title='CREATE POST' />
          )}
          <Grid container spacing={4}>
            {!isFeaturedprogress ? (
              featuredBlogs.map((post) => (
                <FeaturedPosts key={post.id + 'featured'} post={post} />
              ))
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
              {!isBlogsProgress ? (
                <MainSection
                  title='All Posts'
                  blogs={blogs}
                  currentPage={currentPage}
                  perPage={perPage}
                />
              ) : (
                <CircularProgress />
              )}
              <CustomPagination
                count={Math.ceil(blogsCount / perPage)}
                handleChange={handlePageChange}
                currentPage={currentPage}
              />
            </Grid>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
          <Grid container spacing={4}>
            <Contact history={props.history} />
          </Grid>
        </main>
      </Container>
    </>
  );
};

export default Blogs;
