import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { useAuth } from "../../hooks/AuthContext";
import { chatService } from "../../service/chatService";

export default function Chat() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState(null);
  const { user } = useAuth();
  const processedUrlMessage = useRef(false);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadPreviousChats = async () => {
      if (!user) return;

      try {
        const chats = await chatService.getUserChats(user.uid);
        if (chats.length > 0) {
          const lastChat = chats[chats.length - 1];
          setMessages(lastChat.messages);
          setChatId(lastChat.id);
          setFirstMessageSent(true);
        }
      } catch (error) {
        console.error("Error loading chats:", error);
      }
    };

    loadPreviousChats();
  }, [user]);

  const sendMessage = useCallback(async (messageToSend = input) => {
    if (!messageToSend.trim() || !user) return;

    const userMessage = { sender: "user", text: messageToSend, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      let currentChatId = chatId;
      const updatedMessages = [...messages, userMessage];

      if (!firstMessageSent) {
        currentChatId = await chatService.createNewChat(user.uid, userMessage);
        setChatId(currentChatId);
        setFirstMessageSent(true);
      } else {
        await chatService.updateChat(user.uid, currentChatId, updatedMessages);
      }

      const API_URL = process.env.REACT_APP_API_URL;

const response = await fetch(`${API_URL}/api/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: messageToSend }),
});
      const data = await response.json();
      const botMessage = { sender: "bot", text: data.response, timestamp: new Date() };

      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      await chatService.updateChat(user.uid, currentChatId, newMessages);

      setIsTyping(false);
    } catch (err) {
      console.error("Error:", err);
      setIsTyping(false);
      const errorMsg = { sender: "bot", text: "Something went wrong. Try again!" };
      setMessages((prev) => [...prev, errorMsg]);
    }
  }, [input, messages, firstMessageSent, chatId, user]);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message && !processedUrlMessage.current && user) {
      processedUrlMessage.current = true;
      window.history.replaceState({}, "", "/chat");
      sendMessage(message);
    }
  }, [searchParams, user, sendMessage]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 relative">
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto bg-opacity-50 pb-24">
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
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} px-4 py-2`}
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
                    index === messages.length - 1 ? (
                      <ReactTyped
                        strings={[msg.text]}
                        typeSpeed={30}
                        showCursor={true}
                        cursorChar="|"
                      />
                    ) : (
                      msg.text
                    )
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
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-gradient-to-t from-gray-900 to-transparent fixed bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto flex gap-2">
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
            onClick={() => sendMessage()}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}