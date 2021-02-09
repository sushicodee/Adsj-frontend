import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import { axiosApi } from 'axios/axiosApi';
import { removeCookie } from 'helpers/auth';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  userProfile: null,
  login: (data) => {},
  logout: () => {},
  renew: (token) => {},
  fetchProfile: () => {},
};

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
if (accessToken) {
  const decodedToken = jwtDecode(accessToken);
  initialState.user = decodedToken;
  initialState.user.accessToken = accessToken;
  initialState.user.refreshToken = refreshToken;
}

const AuthContext = createContext(initialState);
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
      };
    }
    case 'RENEW': {
      return {
        ...state,
        user: {
          ...state.user,
        },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }

    case 'FETCH_PROFILE': {
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    case 'fETCH_PROFILE_ERROR': {
      return {
        ...state,
        userProfile: false,
      };
    }
    default:
      return state;
  }
}
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(data) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    dispatch({ type: 'LOGIN', payload: data });
  }

  function renew(data) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    dispatch({ type: 'RENEW', payload: data });
  }
  function logout() {
    localStorage.clear();
    removeCookie('token');
    removeCookie('refreshToken');
    dispatch({ type: 'LOGOUT' });
  }

  async function fetchProfile() {
    try {
      const { user } = await axiosApi.get('/user', {}, {}, true);
      dispatch({ type: 'FETCH_PROFILE', payload: user });
    } catch (err) {
      dispatch({ type: 'FETCH_PROFILE_ERROR' });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userProfile: state.userProfile,
        renew,
        login,
        logout,
        fetchProfile,
      }}
      {...props}
    ></AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
