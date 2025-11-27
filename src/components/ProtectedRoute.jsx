// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import { getAccessToken, clearAccessToken } from "../tokenStore";
import { logoutUser } from "../reducers/userReducer";
import { useToast } from "../toastContext/useToast";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const { user, isAuthenticated, token, loading } = useSelector(
    (state) => state.user
  );

  // ⏳ 1. Show loader while checking user state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PropagateLoader color="#facc15" size={60} />
      </div>
    );
  }

  // 🛡 2. Get the freshest token (prefer tokenStore over Redux)
  const storedToken = getAccessToken() || token;

  // ❌ 3. If token exists but is invalid/expired — logout safely
  if (storedToken) {
    try {
      const decoded = jwtDecode(storedToken);

      // Token expired?
      if (decoded.exp * 1000 < Date.now()) {
        dispatch(logoutUser());
        clearAccessToken();
        showToast("Session expired. Please login again.", "error");

        return <Navigate to="/select-estate" replace />;
      }
    } catch (err) {
      dispatch(logoutUser());
      clearAccessToken();
      showToast("Invalid token. Please login again.", "error");

      return <Navigate to="/select-estate" replace />;
    }
  }

  // ❌ 4. No token = not logged in
  if (!storedToken || !isAuthenticated) {
    showToast("You must be logged in to continue.", "error");
    return <Navigate to="/select-estate" replace />;
  }

  // 🚫 5. Role check
  if (allowedRole && user?.role !== allowedRole) {
    showToast(`Access denied for role: ${user?.role}`, "error");

    return <Navigate to="/select-estate" replace />;
  }

  // ✔️ 6. All good — allow access
  return children;
};

// Reusable wrappers
export const UserProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRole="user">{children}</ProtectedRoute>
);

export const AdminProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRole="admin">{children}</ProtectedRoute>
);

export default ProtectedRoute;
