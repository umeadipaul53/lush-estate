// src/api/api.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "../tokenStore";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://lush-estate-backend.onrender.com/api"
      : "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // send cookies (HttpOnly refresh token)
});

// Check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

// Refresh queue to avoid multiple refresh calls
let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, newToken = null) => {
  refreshQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(newToken);
  });
  refreshQueue = [];
};

const refreshAccessToken = async () => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      refreshQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    // Use axios (not API) to avoid interceptors loop
    const res = await axios.post(
      `${API.defaults.baseURL}/auth/v1/refresh-token`,
      {},
      { withCredentials: true }
    );

    const { accessToken } = res.data;

    if (!accessToken) throw new Error("No access token returned from refresh");

    setAccessToken(accessToken);
    processQueue(null, accessToken);
    return accessToken;
  } catch (err) {
    processQueue(err, null);
    clearAccessToken();
    // don't forcibly redirect here; callers can handle logout flow
    return null;
  } finally {
    isRefreshing = false;
  }
};

// Request interceptor - attach token (and try refresh if expired)
API.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();

    if (token && isTokenExpired(token)) {
      token = await refreshAccessToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401s and attempt refresh once then retry
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // If no response (network) or it's not 401, just propagate
    if (!error.response) return Promise.reject(error);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return API(originalRequest);
        }
      } catch (err) {
        // refresh failed
        clearAccessToken();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
