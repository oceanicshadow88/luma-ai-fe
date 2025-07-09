import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import { ApiErrorMeta, ApiError } from '@custom-types/ApiError';

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
          cooldownSeconds?: number;
        }
      | undefined;
    const message = data?.message || 'Unexpected error occurred';
    const meta: ApiErrorMeta = {
      cooldownSeconds: data?.cooldownSeconds,
      field: data?.field
    };

    return Promise.reject(new ApiError(message, meta));
  }
);