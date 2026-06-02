import "../Components/Sidebar.css";

function Sidebar({
  chats,
  currentChatId,
  setCurrentChatId,
  createNewChat,
  setMessage,
  isSidebarOpen,
}) {
  return (
    <div className={isSidebarOpen ? "sidebar sidebar-open" : "sidebar"}>
      <button className="new-chat-btn" onClick={createNewChat}>
        + New Chat
      </button>
      <div className="chat-list">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={currentChatId === chat.id ? "active-chat" : "chat-item"}
            onClick={() => {
              setCurrentChatId(chat.id);
              setMessage("");
            }}
          >
            <span title={chat.title}>{chat.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
