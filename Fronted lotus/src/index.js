import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/Authcontext";
import { BettingProvider } from "./context/BettingContext";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <AuthProvider>
      <BettingProvider>
        <App />
      </BettingProvider>
    </AuthProvider>

);
