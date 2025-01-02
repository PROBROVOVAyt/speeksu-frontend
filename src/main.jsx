import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Здесь добавлены импорты
import "./index.css";
import App from "./App.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import RecoveryPage from "./pages/auth/RecoveryPage.jsx";
import UserInfoPage from "./pages/user/UserInfoPage.jsx";
import UserSettingsPage from "./pages/user/UserSettingsPage.jsx";
import ChatPage from "./pages/chat/ChatPage.jsx";
import ChatListPage from "./pages/chat/ChatListPage.jsx"

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth/" element={<AuthPage />} />
      <Route path="/auth/reg/" element={<RegisterPage />} />
      <Route path="/auth/login/" element={<LoginPage />} />
      <Route path="/auth/recovery/" element={<RecoveryPage />} />
      <Route path="/user/info/" element={<UserInfoPage />} />
      <Route path="/user/settings/" element={<UserSettingsPage />} />
      <Route path="/chat/:channelId/" element={<ChatPage />} />
      <Route path="/chat/" element={<ChatListPage />} />

    </Routes>
  </BrowserRouter>
);
