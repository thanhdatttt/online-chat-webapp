import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";
import { config } from "@/lib/config";

// set up for calling apis
const api = axios.create({
  // get the url with correct mode
  baseURL: config.apiUrl,
  withCredentials: true,
});

// interceptor to attach access token to header of protected requests
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// auto call refresh api when token is expired
api.interceptors.response.use((res) => res, async (error) => {
  const originalRequest = error.config;

  // skip apis that does not need to check token is expired
  if (
    originalRequest.url.includes("/auth/signin") ||
    originalRequest.url.includes("/auth/signup") ||
    originalRequest.url.includes("/auth/refresh")
  ) {
    return Promise.reject(error);
  }

  // limit time to refresh
  originalRequest._retryCount = originalRequest._retryCount || 0;

  // check token is expired or invalid and refresh
  if (error.response.status === 403 && originalRequest._retryCount < 4) {
    // limit time
    originalRequest._retry += 1;
    try {
      // get token by refresh and store in state
      const res = await api.post("/auth/refresh");
      const newAccessToken = res.data.accessToken;
      useAuthStore.getState().setAccesstoken(newAccessToken);

      // attach new accesstoken to request header
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // continue that request
      return api(originalRequest);
    } catch (err) {
      console.log(err);
      useAuthStore.getState().clearState();
      return Promise.reject(err);
    }
  }

  return Promise.reject(error);
});

export default api;