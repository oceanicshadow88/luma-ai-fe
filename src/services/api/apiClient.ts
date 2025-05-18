import axios, { AxiosError } from 'axios';
import { ApiError } from '@custom-types/ApiError';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://api.example.com';
const API_VERSION = '/v1';

export const apiClient = axios.create({
  baseURL: `${BASE_URL}${API_VERSION}`,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data?.success === false) {
      const { error, payload } = response.data;
      throw new ApiError(error, payload);
    }
    return response;
  },
  (error: AxiosError) => {
    const data = error.response?.data as { message?: string; cooldownSeconds?: number } | undefined;
    const status = error.response?.status;

    if (status === 429 && data?.cooldownSeconds !== undefined) {
      throw new ApiError(data.message || 'Too many requests', { 
        cooldownSeconds: data.cooldownSeconds 
      });
    }

    throw new ApiError(data?.message || 'Request failed');
  }
);