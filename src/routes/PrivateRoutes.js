import PropTypes from "prop-types";
import { Route, Navigate } from "react-router-dom";
import { map } from "./RouteMap";
import TokenManager from "../lib/tokenManager";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { access_token } = TokenManager.getToken();

  return (
    <Route
      {...rest}
      render={(props) => {
        access_token ? (
          <Component {...props} />
        ) : (
          <Navigate to={map.routes.login} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.shape({}).isRequired,
};

export default PrivateRoute;
