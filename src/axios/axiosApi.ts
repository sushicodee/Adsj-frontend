import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: 'json',
});

const httpHeaders = (isSecure : boolean) => {
  let options:any = {
    'Content-Type': 'application/json',
  };
  if (isSecure) {
    // options['Authorization']= getItem('token');
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

const post = (url :string, data = {}, { params = {} } = {}, isSecure:boolean) => {
  return new Promise((resolve, reject) => {
    http
      .post(url, data, { headers: httpHeaders(isSecure), params })
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

const remove = (url :string, isSecure:boolean) => {
  return new Promise((resolve, reject) => {
    http
      .delete(url, { headers: httpHeaders(isSecure) })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const uploadFile = (method :string, url :string, data : any, files : any[]) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
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
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        console.log('req cycle compoleted', xhr.response);
        if (xhr.status === 200) {
          console.log('success');
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    xhr.open(method, url, true);
    xhr.send(formData);
  });
};

export const axiosApi = { get, post, put,patch, remove, uploadFile };
