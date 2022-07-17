import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import { ApolloProvider, gql } from "@apollo/client";
import { client } from "./lib/tokenManager";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GlobalProvider, useGlobalContext } from "./Context/GlobalContext";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));

// FOR HASHING ROUTES
const forceSlashAfterHash = () => {
  let _hash = window.location.hash;

  if (_hash[1] && _hash[1] != "/") {
    window.location.href =
      window.location.origin +
      window.location.pathname +
      window.location.search +
      "#/" +
      _hash.slice(1);
  }
};

forceSlashAfterHash();

window.addEventListener("hashchange", forceSlashAfterHash);
// FOR HASHING ROUTES END

root.render(
  <>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </ApolloProvider>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
