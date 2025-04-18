import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ReactTyped } from "react-typed";

export default function Chat() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(-1);
  const [displayedText, setDisplayedText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentTypingIndex >= 0 && messages[currentTypingIndex]?.sender === "bot") {
      setDisplayedText("");  // Reset displayed text when new message starts
    }
  }, [currentTypingIndex, messages]);

  const sendMessage = async (messageToSend = input) => {
    if (!messageToSend.trim()) return;
  
    const userMessage = { sender: "user", text: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFirstMessageSent(true);
    setIsTyping(true);
  
    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageToSend }),
      });
  
      const data = await res.json();
      setIsTyping(false);
      const botMessage = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
      setCurrentTypingIndex(messages.length + 1);
    } catch (err) {
      console.error("Failed to fetch response", err);
      setIsTyping(false);
      const errorMsg = { sender: "bot", text: "Something went wrong. Try again!" };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  // Handle URL parameter message
  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      window.history.replaceState({}, '', '/chat');
      setInput(message);
      const timer = setTimeout(() => {
        sendMessage(message);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []); // Run only once on mount

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      // Optional: show a preview or send to backend
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24">
      <div className="flex-1 overflow-y-auto bg-opacity-50">
        {!firstMessageSent && (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-semibold text-gray-300">
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-semibold shadow-lg">
                  AI
                </div>
              )}

              <div
                className={`${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl rounded-br-none ml-auto shadow-lg p-4"
                    : "text-gray-200"
                } text-base whitespace-pre-line w-fit ${msg.sender === "bot" ? "pl-2" : ""}`}
              >
                {msg.sender === "bot" ? (
                  <ReactTyped
                    strings={[msg.text]}
                    typeSpeed={30}
                    showCursor={index === messages.length - 1}
                    cursorChar="|"
                  />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          </div>
        ))}
          {isTyping && (
            <div className="flex justify-start px-4 py-2">
              <div className="max-w-3xl flex items-start gap-3 w-full">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
                  AI
                </div>
                <div className="text-gray-200 p-4 text-base">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-gradient-to-t from-gray-900 to-transparent">
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
            className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer transition-colors shadow-lg"
          >
            📷
          </label>
          <input
            type="text"
            className="flex-1 p-4 bg-gray-700 text-white rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg backdrop-blur-sm"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button 
            className="p-4 bg-gradient-to-r from-purple-700 to-purple-800 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg"
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
