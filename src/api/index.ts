import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from 'axios';
import router from '@/router';

import { Store } from 'vuex';

let storeInstance: Store<any> | null = null;

export const setStore = (store: Store<any>) => {
  storeInstance = store;
};

const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'right',
    y: 'top',
  },
});

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
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
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toggleLoader('hide');
    notyf.error(error.response?.data?.message || 'Request error');
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    toggleLoader('hide');
    return response;
  },
  async (error) => {
    toggleLoader('hide');

    if (error.response?.status === 401 && storeInstance?.state.isAuthenticated) {
      storeInstance.state.isAuthenticated = false;
      console.log('Authentication failed, trying to refresh...');
      const refreshResult = await storeInstance?.dispatch('updateRefreshToken');
      console.log('Refresh token update:', refreshResult);

      if (refreshResult) {
        // Retrying original request
        return instance(error.config);
      }
      console.log('Refresh failed, redirecting to login...');
      if (router.currentRoute.path !== '/login') {
        router.push('/login');
      }
    }
    if (error.response?.status === 401) {
      const message = error.response?.data?.error;
      if (message) {
        notyf.error(message);
      }

      toggleLoader('hide');
      if (router.currentRoute.path !== '/login') {
        router.push('/login');
      }
    } else {
      notyf.error(error.response?.data?.message || 'Request error');
    }
    return Promise.reject(error);
  },
);

export default instance;
