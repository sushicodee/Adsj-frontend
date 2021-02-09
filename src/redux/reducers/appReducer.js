import { getItem, setItem } from './../../utils/localStorage/LocalStorage';
import { SET_PROGRESS, TOGGLE_THEME } from '../actions/app/types';

const theme = getItem('theme') || 'dark';
document.body.classList.add(theme);
const initialState = {
  theme: theme,
  progress: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case TOGGLE_THEME:
      const theme = state.theme === 'light' ? 'dark' : 'light';
      setItem('theme', theme);
      return {
        ...state,
        theme,
      };
    default:
      return state;
  }
};
