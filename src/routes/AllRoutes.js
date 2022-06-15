import React from "react";
import { Routes, useLocation, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { map } from "./RouteMap";
import TokenManager from "../lib/tokenManager";
import Login from "../pages/Login";
import { RoutesFa } from "./RoutesFa";

const AllRoutes = () => {
  const location = useLocation();
  const { access_token } = TokenManager.getToken();
  return (
    <Routes location={location}>
      <PublicRoutes path={map.routes.login} element={Login} exact />
      <Route path="/" element={RoutesFa} />
      <Route exact path="/">
        {access_token ? (
          <Navigate to={map.routes.users} />
        ) : (
          <Navigate to={map.routes.login} />
        )}
      </Route>
    </Routes>
  );
};

export default AllRoutes;
