import {
  FETCH_MAIN_FEATURED_BLOG,
  SET_PROGRESS,
  FETCH_BLOGS,
  FETCH_FEATURED_BLOGS,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  LIKE_BLOG,
  SET_PROGRESS_BLOGS,
  SET_CURRENT_PAGE,
  SET_PER_PAGE,
  SET_UPLOAD_PROGRESS,
} from 'redux/actions/blog/types';

import { v4 as uuid } from 'uuid';

const initialState = {
  progress: false,
  blogs: [],
  featuredBlogs: [],
  mainFeaturedBlog: {},
  currentPage: 1,
  perPage: 3,
  blogsCount: 0,
  isBlogsProgress: false,
  isFeaturedProgress: false,
  cachedPages: [],
  uploadProgress: 0,
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };

    case SET_PROGRESS_BLOGS:
      return {
        ...state,
        isBlogsProgress: action.payload,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_PER_PAGE:
      return {
        ...state,
        perPage: action.payload,
      };
    case FETCH_BLOGS:
      // const start = (action.payload.currentPage - 1) * action.payload.perPage;
      // const end = start + action.payload.perPage - 1;
      const updatedBlogs = action.payload.blogs;
      // const updatedBlogs = [...state.blogs];
      // for (let i = 0; i <= Math.max(end, updatedBlogs.length); i++) {
      //   if (!state.cachedPages.includes(action.payload.currentPage)) {
      //     if (i !== start) {
      //       if (updatedBlogs[i] === undefined) {
      //         updatedBlogs[i] = { id: uuid() };
      //       }
      //     } else {
      //       const isMockData =
      //         updatedBlogs[i] && !updatedBlogs[i].hasOwnProperty('title');
      //       if (isMockData) {
      //         updatedBlogs.splice(
      //           start,
      //           action.payload.perPage,
      //           ...action.payload.blogs
      //         );
      //       } else {
      //         updatedBlogs.splice(start, 0, ...action.payload.blogs);
      //       }
      //       break;
      //     }
      //   }
      // }
      return {
        ...state,
        blogs: updatedBlogs,
        blogsCount: action.payload.count,
        // cachedPages: [...state.cachedPages, action.payload.currentPage],
      };
    case FETCH_FEATURED_BLOGS:
      return {
        ...state,
        featuredBlogs: action.payload,
      };
    case FETCH_MAIN_FEATURED_BLOG:
      return {
        ...state,
        mainFeaturedBlog: action.payload,
      };

    case ADD_BLOG: {
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        blogsCount: state.blogsCount + 1,
      };
    }

    case DELETE_BLOG: {
      const updatedblogs = state.blogs.filter((p) => p.id !== action.payload);
      return {
        ...state,
        blogs: updatedblogs,
        blogsCount: state.blogsCount - 1,
      };
    }
    case UPDATE_BLOG: {
      const updatedBlog = state.blogs.map((blog) => {
        if (blog._id === action.payload.__id) {
          return action.payload;
        }
        return blog;
      });
      return {
        ...state,
        blogs: updatedBlog,
      };
    }

    case SET_UPLOAD_PROGRESS: {
      return {
        ...state,
        uploadProgress: action.payload,
      };
    }
    default:
      return state;
  }
};
