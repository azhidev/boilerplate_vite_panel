// src/api.js
import axios from 'axios';
import settings from './config/settings';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Access the base URL from .env
});


// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(settings.tokenKey);
    
    // If there's a token, include it in the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // If no token and we're not on the login page, redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove the token and redirect to login on 401 Unauthorized
      localStorage.removeItem(settings.tokenKey);
      
      // Avoid redirection if already on the login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
