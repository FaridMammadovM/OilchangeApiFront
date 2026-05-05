import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

const request = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken; // Get token from Zustand
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh or errors
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response?.status === 401) {
      const refreshToken = useAuthStore.getState().refreshToken;
      if (refreshToken) {
        try {
          // Attempt to refresh token
          const { data } = await axios.post(API_URL + '/customers/checkToken', `"${refreshToken}"`, {
            headers: {
              "Content-Type": 'application/json'
            }
          });
          // Update token in Zustand
          useAuthStore.getState().setTokens(data.data);

          // Retry original request
          error.config.headers.Authorization = data.data.accessToken;
          return request(error.config);
        } catch (refreshError) {
          // Handle token refresh failure (e.g., logout)
          useAuthStore.getState().resetAuth();
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, logout
        useAuthStore.getState().resetAuth();
      }
    }
    return Promise.reject(error);
  }
);

export default request;
