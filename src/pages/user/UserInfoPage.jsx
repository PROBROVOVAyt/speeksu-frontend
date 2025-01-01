import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function UserInfoPage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Токен не найден. Войдите в систему.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          setError("Токен недействителен. Пожалуйста, авторизуйтесь заново.");
          localStorage.removeItem("authToken");
          navigate("/auth/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Не удалось получить данные пользователя.");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleExit = () => {
    localStorage.removeItem("authToken");
    navigate("/auth/login");
  };

  if (error) {
    return (
      <div className="bg-slate-900 h-screen flex justify-center items-center flex-col text-white">
        <h1 className="text-2xl">Ошибка</h1>
        <p className="text-lg">{error}</p>
        <NavLink
          className="bg-slate-800 transition-all hover:scale-105 text-white w-64 mt-8 py-4 text-center font-semibold text-xl rounded-lg my-2"
          to="/auth/login"
        >
          Войти
        </NavLink>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-slate-900 h-screen flex justify-center items-center flex-col text-white">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 h-screen flex justify-center items-center flex-col text-white">
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full"
          src={`https://api.ccail.ru/user/avatar/${userData.username}`}
          alt=""
        />
        <div className="font-medium text-2xl dark:text-white">
          <div>{userData.username}</div>
        </div>
      </div>
      <button
        id="exit"
        type="button"
        className="bg-red-600 transition-all hover:scale-105 text-white w-64 mt-8 py-4 text-center font-semibold text-xl rounded-lg my-2"
        onClick={handleExit}
      >
        Выйти
      </button>
    </div>
  );
}

export default UserInfoPage;
