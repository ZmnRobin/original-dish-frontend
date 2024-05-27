import axios from 'axios';
import { backendUrl } from './const';

// Create an Axios instance
const api = axios.create({
  baseURL: `${backendUrl}/api`,
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
