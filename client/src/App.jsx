import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../src/App.css";
import MessageBubble from "./Components/MessageBubble";
import ChatInput from "./Components/ChatInput";
import Sidebar from "./Components/Sidebar";

function App() {
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chats");

    return savedChats
      ? JSON.parse(savedChats)
      : [
          {
            id: 1,
            title: "New Chat",
            messages: [],
          },
        ];
  });
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [currentChatId, setCurrentChatId] = useState(1);
  const currentChat = chats.find((chat) => chat.id === currentChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [currentChat?.messages]);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [...prev, newChat]);
    

    setCurrentChatId(newChat.id);
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      return;
    }

    const userMessage = {
      role: "user",
      content: message,
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === currentChatId) {
          const updatedMessages = [...chat.messages, userMessage];

          return {
            ...chat,

            title:
              chat.title === "New Chat" ? message.slice(0, 20) : chat.title,

            messages: updatedMessages,
          };
        }

        return chat;
      }),
    );
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post( "https://ai-chatbot-project-backend.onrender.com/chat", {
        message,
        messages: currentChat.messages,
      });

      const aiMessage = {
        role: "assistant",
        content: res.data.reply,
      };

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === currentChatId) {
            return {
              ...chat,

              messages: [...chat.messages, aiMessage],
            };
          }

          return chat;
        }),
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        createNewChat={createNewChat}
        setMessage={setMessage}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="mobile-header">
        <button
          className="hamburger-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>

        <h2>AI Assistant</h2>
      </div>

      <div className="chat-section">
        <h2>AI Assistant</h2>
        <div className="messages-container">
          {currentChat?.messages.map((msg, index) => (
            <MessageBubble key={index} msg={msg} />
          ))}

          <div ref={messagesEndRef}></div>

          {loading && (
            <div className="typing-loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        <ChatInput
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}

export default App;
