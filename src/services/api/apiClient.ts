import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import { ApiErrorMeta, ApiError } from '@custom-types/ApiError';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://api.example.com';
const API_VERSION = '/api/v1';

export const apiClient = axios.create({
  baseURL: `${BASE_URL}${API_VERSION}`,
  timeout: 10000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data as
      | {
          message?: string;
          field?: string;
        }
      | undefined;
    const message = data?.message || 'Unexpected error occurred';
    const meta: ApiErrorMeta = {
      field: data?.field
    };

    if(error.response?.status === 403) {
      localStorage.clear()
      window.location.href = '/login';
      return Promise.resolve(new ApiError(message, meta)); 
    }

    if (!data?.field) {
      toast.error(message);
    }

    return Promise.resolve(new ApiError(message, meta)); 
  }
);