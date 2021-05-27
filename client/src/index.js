import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./index.css";
import dotenv from "dotenv";

dotenv.config({ path: "../env" });

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
