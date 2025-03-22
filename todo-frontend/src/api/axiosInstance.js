import axios from "axios";
import useAuthStore from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://zentasker-4ear.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Automatically attach the token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
