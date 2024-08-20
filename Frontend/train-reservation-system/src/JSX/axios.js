// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Adjust this URL to your backend's URL
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
