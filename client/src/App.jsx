import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  

 const sendMessage = async () => {

  const userMessage = {
    role: "user",
    content: message,
  };

  setMessages((prev) => [...prev, userMessage]);
  setMessage("");

   try {
     const res = await axios.post("http://localhost:5000/chat", {
       message: message,
     });

     const aiMessage = {
       role: "ai",
       content: res.data.reply,
     };

     setMessages((prev) => [...prev, aiMessage]);
   } catch (error) {
     console.log(error);
   }
 };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI Chatbot</h1>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage}>Send</button>

      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.role === "user" ? "You" : "AI"}:</strong>

          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
