// src/components/AuthProvider.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  getAccessToken,
  clearAccessToken,
  setAccessToken,
} from "../tokenStore";
import API from "../api/api";
import { logoutUser } from "../reducers/userReducer";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      let token = getAccessToken();

      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        // If token already expired, try refresh
        if (decoded.exp < Date.now() / 1000) {
          const res = await API.post(
            "/auth/v1/refresh-token",
            {},
            { withCredentials: true }
          );
          const { accessToken } = res.data;
          if (accessToken) {
            setAccessToken(accessToken);
            token = accessToken;
          } else {
            token = null;
          }
        }

        if (!token) {
          // refresh failed or no token available
          dispatch(logoutUser());
          clearAccessToken();
          window.location.href = "/get-started";
        }
      } catch (err) {
        // any parsing / network error -> logout
        dispatch(logoutUser());
        clearAccessToken();
        window.location.href = "/get-started";
      }
    };

    checkToken();
    // run once on mount
  }, [dispatch]);

  return children;
};

export default AuthProvider;
