import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {getLocalStorage, setCookie, setLocalStorage , removeCookie} from './../helpers/auth';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: 'json',
});

// Response interceptor for API calls
http.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  console.log(error.response,'here')
  if (error.response.data.message === 'jwt expired' && !originalRequest._retry) {
    console.log('expired')
    originalRequest._retry = true;
    const {accessToken,refreshToken} = await refreshAccessToken();            
    setLocalStorage('accessToken',accessToken);
    setLocalStorage('refreshToken',refreshToken);
    setCookie('token',accessToken)
    setCookie('refreshToken',refreshToken)
    axios.defaults.headers.common['Authorization'] = accessToken;
    return http(originalRequest);
  }
  return Promise.reject(error);
});

async function refreshAccessToken(){
  new Promise(async (resolve,reject) => {
    console.log('refresh called')
    const refresh = getLocalStorage('refreshToken');
      const decodedRefresh:any = jwtDecode(refresh) 
      if (Date.now() > decodedRefresh.exp * 1000) {
        localStorage.clear();
        removeCookie('token');
        removeCookie('refreshToken');
        reject({message:'token expired'})
    }else{
      try{
        const data = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/renew`,{refreshToken:refresh},{headers:{'Content-Type':'application/json'}})
        console.log(data,'renew response')
        setLocalStorage('accessToken',data.accessToken)
        setLocalStorage('refreshToken',data.refreshToken)
        resolve(data)
      }catch(err){
        console.log(err.response)
        reject(err)
      }
    }
  
  })
}

const httpHeaders = (isSecure : boolean,isFile : boolean = false) => {
  let options:any = {
    'Content-Type': isFile ?'multipart/formdata' : 'application/json',
  };

  if (isSecure) {
    options['Authorization']= getLocalStorage('accessToken');
  }
  return options;
};

const get = (url :string, { params = {} } = {}, isSecure = false) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, {
        headers: httpHeaders(isSecure),
        params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const post = (url :string, data = {}, { params = {} ,config = {}} = {}, isSecure:boolean = false, isFile:boolean = false) => {
  return new Promise((resolve, reject) => {
    http
      .post(url, data, { headers: httpHeaders(isSecure,isFile), params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};


const postFile = (url :string, data = {}, files : any[] ,{ params = {} } = {}, isSecure:boolean) => {
  return new Promise((resolve, reject) => {
    const config = {
      onUploadProgress: function(progressEvent:any) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
      }
    }
    const formData = new FormData();
    if (files && files.length) {
      formData.append('image', files[0], files[0].name);
    }
    for (let key in data) {
      if (typeof data[key] === 'object') {
        continue;
      }
      formData.append(key, data[key]);
    }
    http
      .post(url,formData, { headers: httpHeaders(isSecure,true), params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const put = (url :string, data = {}, { params = {} } = {}, isSecure:boolean) => {
  return new Promise((resolve, reject) => {
    http
      .put(url, data, { headers: httpHeaders(isSecure) })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const patch = (url :string, data = {}, { params = {} } = {}, isSecure:boolean) => {
  return new Promise((resolve, reject) => {
    http
      .patch(url, data, { headers: httpHeaders(isSecure) })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const remove = (url :string, {params ={}} = {} ,isSecure:boolean) => {
  return new Promise((resolve, reject) => {
    http
      .delete(url, { headers: httpHeaders(isSecure) , params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const uploadFile = (url :string, data : any, files : any[],cb:any) => {
  return new Promise((resolve, reject) => {
    const config = {
      onUploadProgress: function(progressEvent:any) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
        if(cb){
          cb(percentCompleted);
        }
      }
    }
    const formData = new FormData();
    if (files && files.length) {
      formData.append('image', files[0], files[0].name);
    }

    for (let key in data) {
      if (typeof data[key] === 'object') {
        continue;
      }
      formData.append(key, data[key]);
    }
    axiosApi.post(url,formData,{config})
      .then((response:any) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const axiosApi = { get, post,postFile, put,patch, remove, uploadFile };
