// src/routes/AuthWrapper.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number; // expiration timestamp in seconds
}

/**
 * Utility function to check if user is authenticated.
 * Reads the token from localStorage and checks if expired.
 */
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const decoded: JwtPayload = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return false;
  }
};

/**
 * Protects routes by checking authentication state.
 * - If authenticated → render children (via <Outlet />).
 * - If not authenticated → redirect to `/login`.
 */
export const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

/**
 * Wrapper for the Login route:
 * - If NOT authenticated → show login page (<Outlet />).
 * - If authenticated → redirect to `/`.
 */
export const PublicOnlyRoute: React.FC = () => {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
};
