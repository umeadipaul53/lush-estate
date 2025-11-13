// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import { getAccessToken, clearAccessToken } from "../tokenStore";
import { logoutUser } from "../reducers/userReducer";

const ProtectedRoute = ({ children, allowedRole }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, token, loading } = useSelector(
    (state) => state.user
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PropagateLoader color="#facc15" size={60} />
      </div>
    );
  }

  // Prefer token from tokenStore to avoid stale token in state
  const storedToken = getAccessToken() || token;

  // If token exists but expired, force logout
  if (storedToken) {
    try {
      const decoded = jwtDecode(storedToken);
      if (decoded.exp < Date.now() / 1000) {
        // expired
        dispatch(logoutUser());
        clearAccessToken();
        return <Navigate to="/get-started" replace />;
      }
    } catch (err) {
      dispatch(logoutUser());
      clearAccessToken();
      return <Navigate to="/get-started" replace />;
    }
  }

  if (!isAuthenticated || !storedToken) {
    return <Navigate to="/get-started" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const UserProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRole="user">{children}</ProtectedRoute>
);
export const AdminProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRole="admin">{children}</ProtectedRoute>
);

export default ProtectedRoute;
