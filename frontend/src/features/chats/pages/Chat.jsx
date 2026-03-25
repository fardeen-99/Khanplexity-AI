import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";
import useChat from "../hooks/chat.hook";
import Sidebar from "../components/Sidebar";
import HomeUI from "../components/HomeUI";
import ChatUI from "../components/ChatUI";

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  const { messages, currentChat } = useSelector((state) => state.chat);
  const { handlegetallchats } = useChat();

  useEffect(() => {
    handlegetallchats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determine if we should show Home or Chat UI
  const showHome = messages.length === 0 && !currentChat;

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#0B0B0B", color: "#EAEAEA" }}
    >
      {/* Fixed Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        lightMode={lightMode}
        onToggleLightMode={() => setLightMode((p) => !p)}
      />

      {/* Right content area — only this scrolls */}
      <div className="flex-1 lg:ml-[260px] h-screen overflow-y-auto scrollbar-minimal flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#1F1F1F] sticky top-0 z-20 bg-[#0B0B0B]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#888] hover:text-[#EAEAEA] transition-colors p-1"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold text-[#EAEAEA]">Khanplexity</span>
        </div>

        {/* Conditional rendering */}
        {showHome ? (
          <HomeUI />
        ) : (
          <div className="flex flex-col h-full">
            <ChatUI />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;