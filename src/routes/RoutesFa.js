import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";

import { Admins } from "../pages/Admins";
import { Services } from "../pages/Services";
import Login from "../pages/Login";
import { Orders } from "../pages/Orders";
import { Roles } from "../pages/Roles";
import { Units } from "../pages/Units";
import { CategoriesAttribute } from "../pages/CategoriesAttribute";
import { Categories } from "../pages/Categories";
import { Profile } from "../pages/Profile";

import { map } from "./RouteMap";

import TokenManager from "../lib/tokenManager";
import { Template } from "../components/Template/Template";
import { Users } from "../pages/Users";

export const RoutesFa = () => {
  const { access_token } = TokenManager.getToken();

  return (
    <>
      <Routes>
        <Route exact path={map.routes.login} element={<Login />} />
      </Routes>

      <Routes>
        <Route
          exact
          path={map.routes.dashboard}
          element={
            access_token ? <Dashboard /> : <Navigate to={map.routes.login} />
          }
        />
        <Route
          exact
          path={map.routes.services}
          element={
            access_token ? <Services /> : <Navigate to={map.routes.login} />
          }
        />
        <Route
          exact
          path={map.routes.profile}
          element={
            access_token ? <Profile /> : <Navigate to={map.routes.login} />
          }
        />
        <Route
          exact
          path={map.routes.orders}
          element={
            access_token ? <Orders /> : <Navigate to={map.routes.login} />
          }
        />

        <Route
          exact
          path={map.routes.roles}
          element={
            access_token ? <Roles /> : <Navigate to={map.routes.login} />
          }
        />

        <Route
          exact
          path={map.routes.units}
          element={
            access_token ? <Units /> : <Navigate to={map.routes.login} />
          }
        />

        <Route
          exact
          path={map.routes.categoriesAtr}
          element={
            access_token ? (
              <CategoriesAttribute />
            ) : (
              <Navigate to={map.routes.login} />
            )
          }
        />

        <Route
          exact
          path={map.routes.roles}
          element={
            access_token ? <Roles /> : <Navigate to={map.routes.login} />
          }
        />

        <Route
          exact
          path={map.routes.users}
          element={
            access_token ? <Users /> : <Navigate to={map.routes.login} />
          }
        />
        <Route
          exact
          path={map.routes.categories}
          element={
            access_token ? <Categories /> : <Navigate to={map.routes.login} />
          }
        />
        <Route
          exact
          path={map.routes.admins}
          element={
            access_token ? <Admins /> : <Navigate to={map.routes.login} />
          }
        />
      </Routes>
    </>
  );
};
