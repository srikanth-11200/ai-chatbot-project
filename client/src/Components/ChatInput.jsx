import React from 'react'
import '../Components/ChatInput.css'

function ChatInput({message, sendMessage, setMessage}) {

     const handleKeyDown = (e) => {
       if (e.key === "Enter") {
         sendMessage();
       }
     };
  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something..."
        className="chat-input"
      />

      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}

export default ChatInput