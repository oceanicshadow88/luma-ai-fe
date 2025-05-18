import axios, { AxiosError } from 'axios';
import { ApiError } from '@custom-types/ApiError';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://api.example.com';
const API_VERSION = '/v1';

export const apiClient = axios.create({
  baseURL: `${BASE_URL}${API_VERSION}`,
  timeout: 10000,
});

//Use interceptors to haddle api error
apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const data = error.response?.data as { message?: string; cooldownSeconds?: number } | undefined;
    const status = error.response?.status;

    if (status === 429 && data?.cooldownSeconds !== undefined) {
      return Promise.reject(
        new ApiError(data.message || 'Too many requests', { cooldownSeconds: data.cooldownSeconds })
      );
    }

    const message = data?.message || 'Request failed';
    return Promise.reject(new ApiError(message));
  }
);
