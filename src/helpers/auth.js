import cookie from 'js-cookie';

export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, { expires: 1 });
  }
};

export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key, { expires: 1 });
  }
};

export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key, { expires: 1 });
  }
};

//localstorage

export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const getLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    return localStorage.getItem(key);
  }
};

export const authenticate = (data, next) => {
  console.log(data, 'setting token');
  setCookie('token', data.accessToken);
  setCookie('refreshToken', data.refreshToken);
  setLocalStorage('user', data.user);
  next();
};

export const signout = (next) => {
  removeCookie('token');
  removeCookie('refreshToken');
  removeLocalStorage('user');
};

export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(getLocalStorage('user'));
      } else {
        return false;
      }
    }
  }
};

// update user in ls
export const updateUser = (response, next) => {
  if (window !== 'undefined') {
    let auth = getLocalStorage('user');
    if (response.data) {
      auth = JSON.stringify(response.data);
    }
    setLocalStorage('user', auth);
  }
  next();
};
