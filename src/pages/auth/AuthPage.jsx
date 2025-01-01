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
        <div class="inline-flex items-center justify-center w-full">
          <hr class="w-5/6 h-[2px] my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
            или
          </span>
        </div>
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
