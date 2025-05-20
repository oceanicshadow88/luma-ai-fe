import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8000/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptor
request.interceptors.request.use(
  (config) => {
    // For example, attach token if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor
request.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error responses globally if desired
    return Promise.reject(error);
  }
);

export default request;