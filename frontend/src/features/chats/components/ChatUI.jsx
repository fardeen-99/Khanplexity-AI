import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Plus, Send, Share2 } from "lucide-react";
import useChat from "../hooks/chat.hook";

// Skeleton loader for AI response
const MessageSkeleton = () => (
  <div className="flex flex-col gap-2 w-full max-w-2xl animate-pulse-soft">
    <div className="h-4 bg-[#1F1F1F] rounded-full w-3/4" />
    <div className="h-4 bg-[#1F1F1F] rounded-full w-full" />
    <div className="h-4 bg-[#1F1F1F] rounded-full w-5/6" />
    <div className="h-4 bg-[#1F1F1F] rounded-full w-2/3" />
  </div>
);

// Format text with basic markdown-like rendering
const MessageContent = ({ content }) => {
  // Split by newlines and handle bold (**text**)
  const lines = content.split("\n");
  return (
    <div className="text-[#EAEAEA] text-sm leading-relaxed space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;

        // Bold: **text**
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const rendered = parts.map((part, j) =>
          j % 2 === 1 ? (
            <strong key={j} className="font-semibold text-white">
              {part}
            </strong>
          ) : (
            part
          )
        );

        // Bullet points
        if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#555] mt-0.5 shrink-0">•</span>
              <span>{rendered.slice(1)}</span>
            </div>
          );
        }

        return <p key={i}>{rendered}</p>;
      })}
    </div>
  );
};

const ChatUI = () => {
  const { messages, currentChat, loading } = useSelector((s) => s.chat);
  const { chats } = useSelector((s) => s.chat);
  const { handlesendmessage } = useChat();
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Get current chat title - handle both ID and Object cases for currentChat
  const chatTitle = (() => {
    if (!currentChat) return "Knowledge";
    const chatId = typeof currentChat === "object" ? currentChat._id : currentChat;
    const found = chats?.find((c) => c._id === chatId);
    return found?.title || "Knowledge";
  })();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!text.trim()) return;
    const msg = text.trim();
    setText("");
    
    // Ensure we pass the ID string
    const chatId = typeof currentChat === "object" ? currentChat?._id : currentChat;
    await handlesendmessage(msg, chatId);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-dvh">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F] shrink-0">
        <h2 className="text-[#EAEAEA] font-semibold text-base ">{chatTitle}</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2A] text-[#888] text-sm hover:border-[#3A3A3A] hover:text-[#EAEAEA] transition-all">
          <Share2 size={14} />
          Share
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-minimal px-6 py-6 flex flex-col gap-6">
        {messages.map((msg, i) => (
          <div
            key={msg._id || i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
          >
            {msg.role === "user" ? (
              <div className="max-w-xs md:max-w-md lg:max-w-lg bg-[#1F1F1F] text-[#EAEAEA] rounded-2xl px-4 py-3 text-sm leading-relaxed">
                {msg.content}
              </div>
            ) : (
              <div className="w-full max-w-2xl">
                <MessageContent content={msg.content} />
              </div>
            )}
          </div>
        ))}

        {/* Loading skeleton */}
        {loading && (
          <div className="flex justify-start animate-slide-up">
            <MessageSkeleton />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar (sticky bottom) */}
      <div className="shrink-0 px-6 py-4 border-t border-[#1F1F1F]">
        <div className="bg-[#121212] border border-[#222] rounded-2xl p-4 shadow-lg">
          <textarea
            ref={inputRef}
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up"
            className="w-full bg-transparent text-[#EAEAEA] placeholder-[#444] resize-none outline-none text-sm leading-relaxed scrollbar-none"
          />
          <div className="flex items-center justify-between mt-2">
            <button className="flex items-center gap-1.5 text-[#555] hover:text-[#888] text-sm transition-colors">
              <Plus size={16} />
              Attach
            </button>
            <button
              onClick={handleSend}
              disabled={!text.trim() || loading}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                ${text.trim() && !loading
                  ? "bg-[#EAEAEA] text-[#0B0B0B] hover:bg-white"
                  : "bg-[#222] text-[#555] cursor-not-allowed"
                }`}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
