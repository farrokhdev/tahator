import "./assets/styles/main.scss";
import "antd/dist/antd.css";
import "antd/dist/antd.less";
import { RoutesFa } from "./routes/RoutesFa";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import { useGlobalContext } from "./Context/GlobalContext";
import { ConfigProvider } from "antd";

function App() {
  const { lang } = useGlobalContext();

  return (
    <Router>
      {lang === "tr" ? (
        <ConfigProvider direction="rtl">
          <RoutesFa />
        </ConfigProvider>
      ) : (
        <ConfigProvider>
          <RoutesFa />
        </ConfigProvider>
      )}
    </Router>
  );
}

export default App;
