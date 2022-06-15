import "./assets/styles/main.scss";
import { RoutesFa } from "./routes/RoutesFa";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <Router>
      <RoutesFa />
    </Router>
  );
}

export default App;
