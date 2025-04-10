import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [firstMessageSent, setFirstMessageSent] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    if (!firstMessageSent) setFirstMessageSent(true);

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "This is a bot response!", sender: "bot" }]);
    }, 1000);
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
