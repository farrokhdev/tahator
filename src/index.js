import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
// import "antd/dist/antd.less";
import "antd/dist/antd.css";
import { ApolloProvider, gql } from "@apollo/client";
import { client } from "./lib/tokenManager";
import { Provider } from "react-redux";

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
  <React.StrictMode>
    {/* <Provider store={""}> */}
    <ApolloProvider client={client}>
      <ConfigProvider direction="rtl">
        <App />
      </ConfigProvider>
    </ApolloProvider>
    {/* </Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
