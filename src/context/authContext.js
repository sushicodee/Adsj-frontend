import React, { createContext, useReducer } from "react";
import jwtDecode from 'jwt-decode';

const initialState = {
    user:null,
    login: (data) => {},
    logout: () => {},
    renew:(token) => {}
};

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
if(accessToken){
  const decodedToken = jwtDecode(accessToken);
  if(Date.now() > decodedToken.exp * 1000 ){
      // todo
      //get accessToken using refresh token if user has refresh 
      // or implement axios response interceptor
      localStorage.clear();  
  }
  else{
     initialState.user = decodedToken;
     initialState.user.accessToken = accessToken;
     initialState.user.refreshToken = refreshToken;
  }
}
const AuthContext = createContext(initialState);
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
      };
    }
    case'RENEW':{
        return {
            ...state,
            user:{
                ...state.user,
                accessToken:action.payload.accessToken,
                refreshToken:action.payload.refreshToken,
            }
        }
    }
    default:
      return state;
  }
}
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  
  function login(data) {
    localStorage.setItem('accessToken',data.accessToken);
    localStorage.setItem('refreshToken',data.refreshToken);
    dispatch({ type: "LOGIN", payload: data });
  }

  function renew(data) {
    localStorage.setItem('accessToken',data.accessToken);
    localStorage.setItem('refreshToken',data.refreshToken);
    dispatch({ type: "RENEW", payload: data });
  }
  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user,renew, login, logout }}
      {...props}
    ></AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
