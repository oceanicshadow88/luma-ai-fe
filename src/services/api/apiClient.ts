import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://api.example.com";
const API_VERSION = "/v1"; 

export const apiClient = axios.create({
  baseURL: `${BASE_URL}${API_VERSION}`,
  timeout: 10000,
});