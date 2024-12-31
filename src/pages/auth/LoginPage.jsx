import { useState } from "react";
import Logo from "/speeksu.png";
import { NavLink, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Хук для навигации

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Все поля обязательны для заполнения");
      return;
    }

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Защита от пустого JSON
        console.log("Ошибка от сервера:", errorData);

        if (errorData.detail) {
          setError(
            `Ошибка: ${errorData.detail.map((err) => err.msg).join(", ")}`
          );
        } else {
          setError("Ошибка авторизации");
        }
        return;
      }

      const data = await response.json();
      console.log("Успешный вход:", data);

      // Сохранение только токена в localStorage
      if (data.access_token) {
        localStorage.setItem("authToken", data.access_token);
        console.log("Токен сохранён:", data.access_token);

        // Перенаправление на страницу после успешного входа
        navigate("/"); // Здесь можно указать путь к странице после входа
      }
    } catch (err) {
      console.error("Ошибка запроса:", err);
      setError("Произошла ошибка подключения к серверу");
    }
  };

  return (
    <div className="bg-slate-900 h-screen flex justify-center items-center flex-col">
      <div className="">
        <img src={Logo} className="size-32" alt="Logo" />
      </div>
      <h1 className="text-5xl font-bold text-white">Вход</h1>
      <form className="flex flex-col w-96 mt-16" onSubmit={handleSubmit}>
        <input
          className="bg-slate-800 text-white w-full py-4 px-2 rounded-lg my-2"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите логин"
        />
        <input
          className="bg-slate-800 text-white w-full py-4 px-2 rounded-lg my-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
        {error && (
          <p className="text-left mx-2 text-red-600 cursor-default text-lg">
            {error}
          </p>
        )}
        <div className="h-8"></div>
        <button
          type="submit"
          className="bg-slate-800 transition-all hover:scale-105 text-white w-full py-4 text-center font-semibold text-xl rounded-lg my-2"
        >
          Войти
        </button>
        <div>
          <NavLink className="text-left mx-2 text-white" to="/auth/recovery">
            Забыли пароль или логин?
          </NavLink>
          <NavLink
            className="float-right mx-2 text-white text-base"
            to="/auth/reg"
          >
            Ещё нет аккаунта?
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
