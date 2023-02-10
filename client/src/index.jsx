import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider authType={"cookie"} authName={"auth"} cookieDomain={window.location.hostname} cookieSecure={false}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
