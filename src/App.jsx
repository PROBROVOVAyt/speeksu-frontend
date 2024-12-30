import { useState } from "react";
import Logo from "/speeksu.png";

function App() {
  return (
    <div className="bg-slate-800 h-screen flex justify-center items-center flex-col">
      <div className="">
        <img src={Logo} className="size-64" alt="Logo" />
      </div>
      <h1 className="text-8xl font-bold text-white">Speeksu</h1>
    </div>
  );
}

export default App;
