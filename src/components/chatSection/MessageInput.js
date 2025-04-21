import { useState, useCallback } from "react";
import { chatService } from "../../backend/service/chatService";

export default function MessageInput({ 
  user, 
  chatId,
  messages, 
  setMessages, 
  firstMessageSent, 
  setFirstMessageSent, 
  setChatId, 
  setIsTyping 
}) {
  const [input, setInput] = useState("");

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

      const response = await fetch("http://localhost:8000/api/chat", {
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
  }, [input, messages, firstMessageSent, chatId, user, setChatId, setFirstMessageSent, setIsTyping, setMessages]);

  return (
    <div className="p-4 bg-gradient-to-t from-gray-900 to-transparent">
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
  );
}
