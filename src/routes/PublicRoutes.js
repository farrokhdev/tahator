import React from "react";
import PropTypes from "prop-types";
import { Route, Navigate } from "react-router-dom";
import { map } from "./RouteMap";
import TokenManager from "../lib/tokenManager";

const PublicRoutes = ({ component: Component, ...rest }) => {
  const { access_token } = TokenManager.getToken();

  return (
    <Route
      {...rest}
      render={(props) =>
        access_token ? (
          <Navigate to={map.routes.users} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PublicRoutes.propTypes = {
  component: PropTypes.shape({}).isRequired,
};

export default PublicRoutes;
