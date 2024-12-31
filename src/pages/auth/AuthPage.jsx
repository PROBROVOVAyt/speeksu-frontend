import { useState } from "react";
import Logo from "/speeksu.png";
import { NavLink } from "react-router";

function AuthPage() {
  return (
    <div className="bg-slate-900 h-screen flex justify-center items-center flex-col">
      <div className="">
        <img src={Logo} className="size-32" alt="Logo" />
      </div>
      <h1 className="text-5xl font-bold text-white">Авторизация</h1>
      <div className="flex flex-col w-96 mt-16">
        <NavLink
          className="bg-slate-800 transition-all hover:scale-105 text-white w-full py-4 text-center font-semibold text-xl rounded-lg my-2"
          to="/auth/login"
        >
          Войти
        </NavLink>
        <NavLink
          className="bg-slate-800 transition-all hover:scale-105 text-white w-full py-4 text-center font-semibold text-xl rounded-lg my-2"
          to="/auth/reg"
        >
          Регистрация
        </NavLink>
        <p className="text-center text-white text-lg font-medium">или</p>
        <a
          href=""
          className="bg-[#FC3F1D] transition-all hover:scale-105 text-white w-full py-4 text-center font-semibold text-xl rounded-lg my-2 cursor-pointer"
        >
          Yandex
        </a>
      </div>
    </div>
  );
}

export default AuthPage;
