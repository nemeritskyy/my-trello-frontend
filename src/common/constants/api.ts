import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 123',
  },
});

const toggleLoader = (action: 'show' | 'hide') => {
  const loader = document.getElementById('loader');
  if (loader) {
    if (action === 'show') {
      loader.style.display = 'block';
    } else if (action === 'hide') {
      loader.style.display = 'none';
    }
  }
};

instance.interceptors.request.use(
  (config) => {
    toggleLoader('show');
    return config;
  },
  (error) => {
    toggleLoader('hide');
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    toggleLoader('hide');
    return response;
  },
  (error) => {
    toggleLoader('hide');
    return Promise.reject(error);
  },
);

export default instance;
