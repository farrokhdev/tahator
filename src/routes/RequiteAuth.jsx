import React from "react";
import { Navigate } from "react-router-dom";
import TokenManager from "../lib/tokenManager";

export const RequiteAuth = ({ children }) => {
  const { access_token } = TokenManager.getToken();
  return <>{access_token ? children : <Navigate to="/login" replace />}</>;
};
