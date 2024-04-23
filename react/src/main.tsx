import React from "react";
import ReactDOM from "react-dom/client";
import "./css/style.css";
import "./css/reset.css";
import "./css/externo.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
