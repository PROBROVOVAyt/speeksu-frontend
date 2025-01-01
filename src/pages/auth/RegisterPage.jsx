import { useState } from "react";
import Logo from "/speeksu.png";
import { NavLink, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Все поля обязательны для заполнения");
      return;
    }

    const requestData = { username, email, password };
    console.log("Отправляем на сервер:", requestData);

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      const responseText = await response.text();
      console.log("Ответ сервера (текст):", responseText);

      if (!response.ok) {
        const errorData = JSON.parse(responseText);
        console.log("Ошибка от сервера:", errorData);

        if (errorData.detail) {
          setError(
            `Ошибка: ${errorData.detail.map((err) => err.msg).join(", ")}`
          );
        } else {
          setError("Ошибка регистрации");
        }
        return;
      }

      const data = JSON.parse(responseText);
      console.log("Успешная регистрация:", data);

      if (data.uuid) {
        localStorage.setItem("userUUID", data.uuid);
        console.log("UUID сохранён:", data.uuid);

        navigate("/auth/login");
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
      <h1 className="text-5xl font-bold text-white">Регистрация</h1>
      <form className="flex flex-col w-96 mt-16" onSubmit={handleSubmit}>
        <input
          className="bg-slate-800 text-white w-full py-4 px-2 rounded-lg my-2"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите никнейм"
          name="login"
          id="login"
          required
        />
        <input
          className="bg-slate-800 text-white w-full py-4 px-2 rounded-lg my-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
          name="email"
          id="email"
          required
        />
        <input
          className="bg-slate-800 text-white w-full py-4 px-2 rounded-lg my-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          name="password"
          id="password"
          required
        />
        {error && (
          <p className="text-left mx-2 text-red-600 cursor-default text-lg">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="bg-slate-800 transition-all hover:scale-105 text-white w-full py-4 text-center font-semibold text-xl rounded-lg my-2"
        >
          Зарегистрироваться
        </button>
        <NavLink className="text-right text-white text-base" to="/auth/login">
          Уже есть аккаунт?
        </NavLink>
      </form>
    </div>
  );
}

export default RegisterPage;
