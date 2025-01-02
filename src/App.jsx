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
      <NavLink
        className="bg-slate-800 transition-all hover:scale-105 text-white w-64 mt-8 py-4 text-center font-semibold text-xl rounded-lg"
        to="/auth/"
      >
        Авторизация
      </NavLink>
      <NavLink
        className="bg-slate-800 transition-all hover:scale-105 text-white w-64 mt-2 py-4 text-center font-semibold text-xl rounded-lg"
        to="/chat/"
      >
        Чаты
      </NavLink>
    </div>
  );
}

export default App;
