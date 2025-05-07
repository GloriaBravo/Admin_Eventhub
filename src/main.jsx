import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AdminProvider } from "./context/AdminContext";
import "./styles/index.css";

// ✅ Registro global de iconos Font Awesome
import "./icons/fontAwesome"; // ← asegúrate de que este archivo exista

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>
);
