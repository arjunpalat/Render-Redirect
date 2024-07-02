import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./style.css";
import NotFound from "./pages/NotFound.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/redirect/:id" element={<App />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to={"/404"} />} />
    </Routes>
  </Router>
);
