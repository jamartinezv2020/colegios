// src/api/axios.ts

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate de que esta URL coincida con la de tu backend
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
