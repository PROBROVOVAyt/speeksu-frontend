import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ChatListPage() {
  const [chats, setChats] = useState([]);
  const [newChatName, setNewChatName] = useState("");
  const [userToAdd, setUserToAdd] = useState("");

  useEffect(() => {
    // Fetch chat list from the server
    const fetchChats = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch("/api/ch/list", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setChats(data);
        }
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };
    fetchChats();
  }, []);

  const handleCreateChat = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const chatData = {
      isDm: true, // устанавливаем флаг для личного чата
      name: newChatName, // имя чата
      server: 0 // сервер может быть 0, если чат не связан с сервером
    };

    try {
      const response = await fetch("/api/ch/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(chatData)
      });
      if (response.ok) {
        const chat = await response.json();
        setChats((prev) => [...prev, chat]);
        setNewChatName(""); // очистка поля ввода после успешного создания чата
      }
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  const handleAddUserToChat = async (chatId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("/api/ch/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ channel_id: chatId, user_uuid: userToAdd })
      });
      if (response.ok) {
        alert("User added successfully!");
        setUserToAdd("");
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="bg-slate-900 h-screen flex flex-col items-center text-white">
      <div className="max-w-[1200px] w-full p-4">
        <h1 className="text-2xl font-bold mb-4">Your Chats</h1>
        <div className="space-y-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {chat.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Chat ID: {chat.id}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  className="p-2 w-32 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  type="text"
                  placeholder="User UUID"
                  value={userToAdd}
                  onChange={(e) => setUserToAdd(e.target.value)}
                />
                <button
                  className="px-4 py-2 text-sm font-semibold text-green-600 bg-green-100 rounded-lg hover:bg-green-200 dark:bg-green-800 dark:text-green-400"
                  onClick={() => handleAddUserToChat(chat.id)}
                >
                  Add User
                </button>
                <Link
                  to={`/chat/${chat.id}`}
                  className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-400"
                >
                  Open Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleCreateChat} className="mt-6">
          <div className="flex items-center space-x-4">
            <input
              className="flex-1 p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              type="text"
              placeholder="New chat name"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatListPage;
