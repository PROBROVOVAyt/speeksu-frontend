import { useState } from "react";
import Logo from "/speeksu.png";
import { NavLink } from "react-router";

function RecoveryPage() {
  return (
    <div className="bg-slate-900 h-screen flex justify-center items-center flex-col">
      <div className="">
        <img src={Logo} className="size-32" alt="Logo" />
      </div>
      <h1 className="text-5xl font-bold text-white">Востановление</h1>
    </div>
  );
}

export default RecoveryPage;
