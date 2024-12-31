import { useState } from "react";
import Logo from "/speeksu.png";
import { NavLink, useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="bg-slate-900 h-screen flex justify-center items-center flex-col">
      <div className="">
        <img src={Logo} className="size-64" alt="Logo" />
      </div>
      <h1 className="text-8xl font-bold text-white">Speeksu</h1>
      <NavLink className="text-right text-white text-base" to="/auth">
        Авторизация
      </NavLink>
    </div>
  );
}

export default App;
