import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

function ChatPage() {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userToAdd, setUserToAdd] = useState("");

  useEffect(() => {
    // Fetch messages from the server
    const fetchMessages = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch(`/api/ch/history/${channelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchMessages();
  }, [channelId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`/api/ch/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          channel_id: channelId,
          message: newMessage,
        }),
      });
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { user: "You", msg: newMessage, time: "Just now" },
        ]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`/api/ch/adduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          channel_id: channelId,
          user_uuid: userToAdd,
        }),
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
    <div className="bg-slate-900 h-screen flex justify-center items-center flex-col text-white">
      <div className="max-w-[1200px] w-full">
        <div className="px-2">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-2.5 my-2">
              <img
                className="w-8 h-8 rounded-full"
                src={`https://api.ccail.ru/user/avatar/${message.user}`}
                alt={`${message.user} avatar`}
              />
              <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {message.user}
                  </span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {message.time}
                  </span>
                </div>
                <div className="text-sm text-gray-900 dark:text-white">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <p
                          className="text-4xl font-bold dark:text-white"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <p
                          className="text-3xl font-bold dark:text-white"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <p
                          className="text-2xl font-bold dark:text-white"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {message.msg}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <textarea
              id="chat"
              rows="1"
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1-2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Отправить сообщение</span>
            </button>
          </div>
        </form>
        <form onSubmit={handleAddUser}>
          <div className="flex mt-4">
            <input
              className="block w-full px-4 py-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="Enter user UUID to add"
              value={userToAdd}
              onChange={(e) => setUserToAdd(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 inline-flex justify-center p-2 text-green-600 rounded-lg cursor-pointer hover:bg-green-100 dark:text-green-500 dark:hover:bg-gray-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
