import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Здесь добавлены импорты
import "./index.css";
import App from "./App.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import RecoveryPage from "./pages/auth/RecoveryPage.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth/" element={<AuthPage />} />
      <Route path="/auth/reg/" element={<RegisterPage />} />
      <Route path="/auth/login/" element={<LoginPage />} />
      <Route path="/auth/recovery/" element={<RecoveryPage />} />
    </Routes>
  </BrowserRouter>
);
