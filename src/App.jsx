import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Logo from "/speeksu.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={Logo} className="logo" alt="Logo" />
        </a>
      </div>
      <h1>Speeksu</h1>
    </>
  );
}

export default App;
