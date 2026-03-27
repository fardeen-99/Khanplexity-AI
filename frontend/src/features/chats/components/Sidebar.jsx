import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MessageSquare,
  // Instagram,
  Plus,
  Sun,
  Moon,
  Trash2,
  ChevronRight,
  Search,
  X,
  Bell,
  LogOut
} from "lucide-react";
import useChat from "../hooks/chat.hook";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAuth } from "../../auth/hooks/auth.hook";


// Perplexity SVG logo
const PerplexityLogo = ({ className = "" }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22.3977 7.0896h-2.3106V0.0676l-7.5094 6.3542V0.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932 -6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657 -4.531v4.531h-5.355l5.355 -4.531zm-13.2862 0.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h0.0001v-2.6488l5.7763 -5.7764v7.0111l-5.7764 5.2993zm12.7086 0.0248 -5.7766 -5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882 -5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"
      fill="currentColor"
    />
  </svg>
);

const Sidebar = ({ isOpen, onClose }) => {

const { handlelogout} = useAuth();

  const navigate = useNavigate();
  const { chats, currentChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const { handlegetmessages, handledeletechat, handlenewchat } = useChat();
  const { theme, toggleTheme } = useTheme();

  const handleChatSelect = (chatId) => {
    handlegetmessages(chatId);
    if (onClose) onClose();
  };

  const handleNewChat = () => {
    handlenewchat();
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-[260px] bg-[#F9F9F9] dark:bg-[#0B0B0B] border-r border-[#E5E5E5] dark:border-[#1F1F1F]
          flex flex-col z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Top: Logo */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <NavLink
            to="/chat"
            onClick={handleNewChat}
            className="flex items-center gap-2.5 text-[#111] dark:text-[#EAEAEA] hover:text-black dark:hover:text-white transition-colors group"
          >
            <div className="w-5  flex items-center justify-center">
              <PerplexityLogo className="w-full h-full text-[#111] dark:text-[#888] group-hover:text-black dark:group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm text-[#888] font-semibold tracking-wide">Search</span>
          </NavLink>
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="lg:hidden text-[#888] hover:text-[#EAEAEA] transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-2 pb-2 flex flex-col gap-0.5">
          <NavItem
            icon={<Search size={16} />}
            label="Chats"
            onClick={() => { navigate("/search"); if (onClose) onClose(); }}
          />
          {/* <NavItem
            // icon={<Instagram size={16} />}
            label="Insta Post"
            onClick={() => { }}
          /> */}
          <NavItem
            icon={<Plus size={16} />}
            label="New Chat"
            onClick={() => { navigate("/chat"); handleNewChat(); if (onClose) onClose(); }}
            accent
          />
        </nav>

        <div className="mx-3 h-px bg-[#E5E5E5] dark:bg-[#1F1F1F] my-1" />

        {/* Recent chats */}
        <div className="flex-1 overflow-hidden flex flex-col px-2">
          <p className="text-[10px] font-semibold tracking-wider text-[#555] uppercase px-2 py-2">
            Recent
          </p>
          <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col gap-0.5">
            {chats?.slice(0, 15).map((chat) => {
              const isActive =
                currentChat === chat._id ||
                (typeof currentChat === "object" && currentChat?._id === chat._id);
              return (
                <div
                  key={chat._id}
                  className={`
                      flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer group
                      transition-all duration-150
                      ${isActive
                      ? "bg-[#E5E5E5] text-[#111] dark:bg-[#1F1F2E] dark:text-[#EAEAEA]"
                      : "text-[#555] dark:text-[#888] hover:bg-[#EAEAEA] dark:hover:bg-[#161616] hover:text-[#111] dark:hover:text-[#EAEAEA]"
                    }
                    `}
                  onClick={() => { handleChatSelect(chat._id); navigate("/chat"); if (onClose) onClose(); }}
                >
                  <span className="text-sm truncate flex-1 leading-snug">
                    {chat.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handledeletechat(chat._id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[#555] hover:text-red-400 dark:hover:text-red-400 p-0.5 shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}

            {chats?.length === 0 && (
              <p className="text-[#444] text-xs px-2 py-1">No chats yet</p>
            )}
          </div>

          {chats?.length > 0 && (
            <button 
            onClick={()=>navigate("/search")}
            className="flex items-center gap-1.5 px-2 py-2 text-[#555] hover:text-[#888] text-xs transition-colors">
              <ChevronRight size={12} />
              VIEW ALL
            </button>
          )}
        </div>

        <div className="mx-3 h-px bg-[#E5E5E5] dark:bg-[#1F1F1F] my-1" />

        {/* Bottom: Light mode toggle + User profile */}
        <div className="px-2 pb-4 flex flex-col ">
          <button
            onClick={(e) =>{
               toggleTheme(e.clientX, e.clientY)
              // if (onClose) onClose();
              }}

            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#555] dark:text-[#888] hover:text-[#111] dark:hover:text-[#EAEAEA] hover:bg-[#EAEAEA] dark:hover:bg-[#161616] transition-all w-full text-left group"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} className="group-hover:text-yellow-500" />}
            <span className="text-sm">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>

          {user && (
            <div className="flex items-center gap-3 px-3 pt-2.5 rounded-lg cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white uppercase">
                  {user.username?.[0] || user.email?.[0] || "U"}
                </span>
              </div>
              <span className="text-sm text-[#111] dark:text-[#EAEAEA] truncate">
                {user.username || user.email}
              </span>
              <div className="ml-auto flex gap-2 text-[#555] transition-all">
                <Bell size={16} className="active:scale-95"/>
                <LogOut size={16} className="active:scale-95"
                onClick={()=>{ handlelogout();navigate("/login");
                  dispatch();
                  if (onClose) onClose();}}
                
                />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ icon, label, onClick, accent = false }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-150 text-left
      ${accent
        ? "text-[#555] dark:text-[#888] hover:text-[#111] dark:hover:text-[#EAEAEA] hover:bg-[#EAEAEA] dark:hover:bg-[#161616]"
        : "text-[#555] dark:text-[#888] hover:text-[#111] dark:hover:text-[#EAEAEA] hover:bg-[#EAEAEA] dark:hover:bg-[#161616]"
      }
    `}
  >
    <span className="shrink-0">{icon}</span>
    <span>{label}</span>
  </button>
);

export default Sidebar;
