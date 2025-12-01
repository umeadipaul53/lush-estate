import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import { getAccessToken, clearAccessToken } from "../tokenStore";
import { logoutUser } from "../reducers/userReducer";
import { useToast } from "../toastContext/useToast";

const ProtectedRoute = ({ children, allowedRole }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { user, isAuthenticated, token, loading } = useSelector(
    (state) => state.user
  );

  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (loading) return; // Wait for user state

    const storedToken = getAccessToken() || token;

    // Not logged in
    if (!storedToken || !isAuthenticated) {
      showToast("You must be logged in to continue.", "error");
      setRedirect("/select-estate");
      return;
    }

    // Token validation
    try {
      const decoded = jwtDecode(storedToken);

      if (decoded.exp * 1000 < Date.now()) {
        dispatch(logoutUser());
        clearAccessToken();
        showToast("Session expired. Please login again.", "error");
        setRedirect("/select-estate");
        return;
      }
    } catch (err) {
      dispatch(logoutUser());
      clearAccessToken();
      showToast("Invalid token. Please login again.", "error");
      setRedirect("/select-estate");
      return;
    }

    // Role check
    if (allowedRole && user?.role !== allowedRole) {
      showToast(
        `Access denied: your role (${user?.role}) is not allowed.`,
        "error"
      );
      setRedirect("/select-estate");
      return;
    }
  }, [loading, token, isAuthenticated, dispatch, allowedRole, user?.role]);

  // Loader while checking
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PropagateLoader color="#facc15" size={60} />
      </div>
    );
  }

  if (redirect) {
    return <Navigate to={redirect} replace />;
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
