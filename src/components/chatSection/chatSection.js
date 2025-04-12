import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFirstMessageSent(true);
  
    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await res.json();
  
      const botMessage = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Failed to fetch response", err);
      const errorMsg = { sender: "bot", text: "Something went wrong. Try again!" };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      // Optional: show a preview or send to backend
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        {!firstMessageSent && (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-semibold text-gray-400">
              How can I assist you today?
            </h2>
          </div>
        )}
        
        <div className="w-full max-w-4xl mx-auto">
        {messages.map((msg, index) => (
  <div
    key={index}
    className={`flex ${
      msg.sender === "user" ? "justify-end" : "justify-start"
    } px-4 py-2`}
  >
    <div className="max-w-3xl flex items-start gap-3 w-full">
      {msg.sender === "bot" && (
        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
          AI
        </div>
      )}

      <div
        className={`${
          msg.sender === "user"
            ? "bg-purple-600 text-white rounded-xl rounded-br-none ml-auto"
            : "text-gray-200"
        } p-4 text-base whitespace-pre-line w-fit`}
      >
        {msg.text}
      </div>
    </div>
  </div>
))}
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="p-4 bg-gray-700 text-white rounded-lg cursor-pointer"
          >
            📷
          </label>
          <input
            type="text"
            className="flex-1 p-4 bg-gray-700 text-white rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button 
            className="p-4 bg-purple-800 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
