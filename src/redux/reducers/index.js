import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { blogReducer } from './blogReducer';

export default combineReducers({
  app: appReducer,
  blog: blogReducer,
});
