import { ApiError } from '@custom-types/ApiError';
import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';

function getBackendUrl(): string {
  const hostname = window.location.hostname;
  
  if (hostname.endsWith('.localhost')) {
    return `http://${hostname}:8000`;
  } else {
    return `https://${hostname}`;
  }
}

const BASE_URL = getBackendUrl();
const API_VERSION = '/api/v1';

export const apiClient = axios.create({
  baseURL: `${BASE_URL}${API_VERSION}`,
  timeout: 10000,
  withCredentials: true, 
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
    const status = error.response?.status;
    const data = error.response?.data as
      | {
          message?: string;
          meta?: Record<string, unknown>;
          cooldownSeconds?: number;
        }
      | undefined;
    const message = data?.message || 'Unexpected error occurred';
    const meta = data?.meta;

    if (status === 400) {
      toast.error(message);
      return Promise.reject(new ApiError(message, meta));
    }
    if (status === 401 && message.includes('expired')) {
      return Promise.reject(new ApiError(message, meta));
    }
    if (status === 403) {
      return Promise.reject(new ApiError(message, meta));
    }
    // if (status === 429 && data?.cooldownSeconds !== undefined) {
    //   throw new ApiError(data.message || 'Too many requests', {
    //     cooldownSeconds: data.cooldownSeconds,
    //   });
    // }
    toast.error('Server Error. Please try again or contact support');
    return Promise.reject(new ApiError(message, meta));
  }
);