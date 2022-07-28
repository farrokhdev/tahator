import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";

import { Admins } from "../pages/Admins";
import { Services } from "../pages/Services";
import Login from "../pages/Login";
import { Orders } from "../pages/Orders";
import { Roles } from "../pages/Roles";
import { Currencys } from "../pages/Currencys";
import { CategoriesAttribute } from "../pages/CategoriesAttribute";
import { Categories } from "../pages/Categories";
import { Profile } from "../pages/Profile";

import { map } from "./RouteMap";

import TokenManager from "../lib/tokenManager";
import { Users } from "../pages/Users";
import { SingleUser } from "../pages/SingleUser";
import { FinancialManagement } from "../pages/FinancialManagement";
import { UserWallet } from "../pages/UserWallet";
import { Settlements } from "../pages/Settlements";
import { OfflineTransactions } from "../pages/OfflineTransactions";
import { TestPage } from "../pages/TestPage";

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
          path={map.routes.currencys}
          element={
            access_token ? <Currencys /> : <Navigate to={map.routes.login} />
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
          path={map.routes.settlements}
          element={
            access_token ? <Settlements /> : <Navigate to={map.routes.login} />
          }
        />
        <Route
          exact
          path={map.routes.userWallet}
          element={
            access_token ? <UserWallet /> : <Navigate to={map.routes.login} />
          }
        />
        <Route
          exact
          path={map.routes.financialManagement}
          element={
            access_token ? (
              <FinancialManagement />
            ) : (
              <Navigate to={map.routes.login} />
            )
          }
        />
        <Route
          exact
          path={map.routes.user}
          element={
            access_token ? <SingleUser /> : <Navigate to={map.routes.login} />
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
        <Route
          exact
          path={map.routes.offlineTransactions}
          element={
            access_token ? (
              <OfflineTransactions />
            ) : (
              <Navigate to={map.routes.login} />
            )
          }
        />
        <Route
          exact
          path={"/test"}
          element={
            access_token ? <TestPage /> : <Navigate to={map.routes.login} />
          }
        />
      </Routes>
    </>
  );
};
