// hooks/useAuthorizedApi.ts
import axios from "axios";

export function useAuthorizedApi() {
  const token = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL: "/api",
  });

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
}
