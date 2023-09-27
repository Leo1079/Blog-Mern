import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import 'tailwindcss/tailwind.css'; // Asegúrate de que la ruta sea correcta


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App  />
    </BrowserRouter>
  </React.StrictMode>
);
