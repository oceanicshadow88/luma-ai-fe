import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://api.example.com';
const API_VERSION = '/api/v1';

export const apiClientNoAuth = axios.create({
  baseURL: `${BASE_URL}${API_VERSION}`,
  timeout: 10000,
});
