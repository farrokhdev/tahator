import React from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";
import { Users } from "../pages/Users";
import { Payments } from "../pages/Payments";
import { SettlementRequests } from "../pages/SettlementRequests";
import { UserCalls } from "../pages/UserCalls";
import { UserCategories } from "../pages/UserCategories";
import { Admins } from "../pages/Admins";
import Login from "../pages/Login";
import { Template } from "../components/Template/Template";

import { map } from "./RouteMap";

import { WalletDetail } from "../pages/WalletDetail";
import TokenManager from "../lib/tokenManager";

export const RoutesFa = () => {
  const { access_token } = TokenManager.getToken();
  return (
    <>
      <Routes>
        <Route exact path={map.routes.login} element={<Login />} />
      </Routes>
      <Template>
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
            path={map.routes.admins}
            element={
              access_token ? <Admins /> : <Navigate to={map.routes.login} />
            }
          />
          <Route
            exact
            path={map.routes.userCategories}
            element={
              access_token ? (
                <UserCategories />
              ) : (
                <Navigate to={map.routes.login} />
              )
            }
          />
          <Route
            exact
            path={map.routes.payments}
            element={
              access_token ? <Payments /> : <Navigate to={map.routes.login} />
            }
          />
          <Route
            exact
            path={map.routes.userCalls}
            element={
              access_token ? <UserCalls /> : <Navigate to={map.routes.login} />
            }
          />
          <Route
            exact
            path={map.routes.settlementRequests}
            element={
              access_token ? (
                <SettlementRequests />
              ) : (
                <Navigate to={map.routes.login} />
              )
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
            path={map.routes.walletDetails}
            element={
              access_token ? (
                <WalletDetail />
              ) : (
                <Navigate to={map.routes.login} />
              )
            }
          />
        </Routes>
      </Template>
    </>
  );
};
