
import { ApiError } from '@custom-types/ApiError';
import axios, { AxiosError, AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://api.example.com';
const API_VERSION = '/v1';

export const apiClient = axios.create({
  baseURL: `${BASE_URL}${API_VERSION}`,
  timeout: 10000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    if (config.headers && config.headers instanceof AxiosHeaders) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    else if (config.headers && typeof config.headers === 'object') {
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});
apiClient.interceptors.response.use(
  (response) => {
    if (response.data?.success === false) {
      const { message, meta } = response.data;
      throw new ApiError(message || 'Request failed', meta);
    }
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data as {
      message?: string;
      meta?: Record<string, unknown>;
      cooldownSeconds?: number;
    } | undefined;

    if (status === 429 && data?.cooldownSeconds !== undefined) {
      throw new ApiError(data.message || 'Too many requests', {
        cooldownSeconds: data.cooldownSeconds,
      });
    }

    const message = data?.message || 'Unexpected error occurred';
    const meta = data?.meta;
    return Promise.reject(new ApiError(message, meta));
  }
);