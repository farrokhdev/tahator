import { map } from "../routes/RouteMap";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Navigate } from "react-router-dom";

const accessToken = "access_token";
const refreshToken = "refresh_token";

let access_token;
let refresh_token;

const token = localStorage.getItem(accessToken);

export const client = new ApolloClient({
  uri: "https://cashforchat.com:8080/graphql",
  cache: new InMemoryCache(),
  headers: {
    // authorization: token ? token : "",
  },
});

// const deleteAllCookies = () => {
//   const cookies = document.cookie.split(";");
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i];
//     const eqPos = cookie.indexOf("=");
//     const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//     document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
//   }
// };

const TokenManager = {
  getToken() {
    // deleteAllCookies();
    try {
      access_token = localStorage.getItem(accessToken);
      refresh_token = localStorage.getItem(refreshToken);
    } catch (e) {
      console.error("token could not be read from local storage");
    }

    return { access_token, refresh_token } || null;
  },

  setToken(_accessToken, _refreshToken) {
    localStorage.setItem(accessToken, _accessToken);
    localStorage.setItem(refreshToken, _refreshToken);
    // setCookie(accessToken, _accessToken, 100);
    // setCookie(refreshToken, _refreshToken, 100);
    access_token = _accessToken || null;
    refresh_token = _refreshToken || null;
  },

  removeToken() {
    localStorage.removeItem(accessToken);
    localStorage.removeItem(refreshToken);
    // @ts-ignore
    setTimeout(() => window.location.replace("./login"), 250);
  },
};

export default TokenManager;
