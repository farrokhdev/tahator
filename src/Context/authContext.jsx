import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenManager from "../lib/tokenManager";
import { useMutation, gql } from "@apollo/client";

const authContext = createContext();

const SET_LOGIN = gql`
  mutation AddTodo($username: String!, $password: String!) {
    adminLogin(input: { username: $username, password: $password }) {
      token
    }
  }
`;

export function AuthProvider({ children }) {
  const [setLogin, { data, loading, error }] = useMutation(SET_LOGIN);
  const Navigate = useNavigate();
  const { access_token } = TokenManager.getToken();

  const loginAdmin = async (username = "", password = "") => {
    await setLogin({ variables: { username, password } }).then(
      Navigate("/users")
    );
  };
  const logOutAdmin = () => {
    localStorage.removeItem(access_token);
  };

  return (
    <authContext.Provider
      value={{
        loginAdmin,
        logOutAdmin,
        data,
        loading,
        error,
        Navigate,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default function useAuthContext() {
  return React.useContext(authContext);
}
