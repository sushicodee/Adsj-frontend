import { Snackbar } from '@material-ui/core';
import axios from 'axios';
import { axiosApi } from 'axios/axiosApi';
import {
  FETCH_MAIN_FEATURED_BLOG,
  FETCH_BLOGS,
  SET_PROGRESS,
  FETCH_FEATURED_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  UPDATE_BLOG,
  LIKE_BLOG,
  UNLIKE_BLOG,
  SET_PROGRESS_BLOGS,
  SET_CURRENT_PAGE,
  SET_PER_PAGE,
} from './types';

export const setProgress = (val) => (dispatch) => {
  dispatch({
    type: SET_PROGRESS,
    payload: val,
  });
};
export const setProgressBlogs = (val) => (dispatch) => {
  dispatch({
    type: SET_PROGRESS_BLOGS,
    payload: val,
  });
};
export const fetchBlogs = (currentPage = 1, perPage = 3) => async (
  dispatch
) => {
  try {
    setCurrentPage(currentPage);
    setPerPage(perPage);
    setProgressBlogs(true);
    const data = await axiosApi.get('/blog', {
      params: {
        perPage,
        currentPage,
      },
    });
    dispatch({
      type: FETCH_BLOGS,
      payload: { ...data, perPage, currentPage },
    });
    setProgressBlogs(false);
  } catch (err) {
    setProgressBlogs(true);
  }
};

export const fetchFeaturedBlogs = () => async (dispatch) => {
  try {
    const { blogs } = await axiosApi.get('/blog/featured');
    dispatch({
      type: FETCH_FEATURED_BLOGS,
      payload: blogs,
    });
  } catch (err) {}
};

export const fetchMainFeaturedBlog = () => async (dispatch) => {
  try {
    const { blog } = await axiosApi.get('/blog/mainFeatured');
    dispatch({
      type: FETCH_MAIN_FEATURED_BLOG,
      payload: blog.length && blog[0],
    });
  } catch (err) {
    console.log(err);
  }
};

export const addBlog = (data, image = null) => async (dispatch) => {
  try {
    if (!image) {
      const { blog } = await axiosApi.post('/blog/admin', data, {}, true);
      dispatch({
        type: ADD_BLOG,
        payload: blog.length && blog[0],
      });
    } else {
      const { blog } = await axiosApi.postFile(
        '/blog/admin',
        data,
        image,
        {},
        true
      );
      dispatch({
        type: ADD_BLOG,
        payload: blog.length && blog[0],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateBlog = (id, data) => async (dispatch) => {
  try {
    const { blog } = await axiosApi.put('/blog/admin', data, { id }, true);
    dispatch({
      type: UPDATE_BLOG,
      payload: blog.length && blog[0],
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBLog = (blog) => async (dispatch) => {
  try {
    const { data } = await axiosApi.remove('/blog/admin', {
      Bucket: 'blog-images-1',
      key: blog.image,
      id: blog.id,
    });
    dispatch({ type: DELETE_BLOG, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const setCurrentPage = (val) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: val,
  });
};

//accepts <= 100
export const setPerPage = (val) => (dispatch) => {
  dispatch({
    type: SET_PER_PAGE,
    payload: val,
  });
};
