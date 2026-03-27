import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Trash2, MessageSquare, Clock, Zap, ArrowUp, ArrowDown } from "lucide-react";
import useChat from "../hooks/chat.hook";
import { useTheme } from "../../../contexts/ThemeContext";

// ─── Utility: Highlight matched text ──────────────────────────────────────────
const HighlightText = ({ text, query }) => {
  if (!query.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-blue-500/20 text-blue-400 rounded px-0.5">
            {part}
          </mark>
        ) : part
      )}
    </span>
  );
};

// ─── Chat Card ─────────────────────────────────────────────────────────────────
const ChatCard = ({ chat, index, query, isActive, onClick, onDelete }) => {
  const [ripple, setRipple] = useState(null);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onClick();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 7) return `${diff}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const tagColors = {
    "AI Generated": "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Recent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Pro: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  const tags = ["AI Generated", ...(index < 3 ? ["Recent"] : [])];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 28 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-2xl border cursor-pointer group
        bg-white dark:bg-[#111111]
        border-[#E8EAED] dark:border-[#1E1E1E]
        transition-shadow duration-300
        hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40
        hover:border-[#D1D5DB] dark:hover:border-[#2A2A2A]
        ${isActive ? "ring-2 ring-blue-500/40 border-blue-500/30 dark:border-blue-500/30" : ""}
      `}
    >
      {/* Ripple */}
      <AnimatePresence>
        {ripple && (
          <motion.span
            key="ripple"
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-10 h-10 rounded-full bg-blue-400/20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: ripple.x, top: ripple.y }}
          />
        )}
      </AnimatePresence>

      <div className="p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E8EAED] to-[#F3F4F6] dark:from-[#1E1E1E] dark:to-[#2A2A2A] flex items-center justify-center shrink-0">
              <MessageSquare size={14} className="text-[#888] dark:text-[#666]" />
            </div>
            <h3 className="font-semibold text-sm text-[#111] dark:text-[#EAEAEA] truncate leading-snug">
              <HighlightText text={chat.title} query={query} />
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-[#F3F4F6] dark:bg-[#1E1E1E] text-[#888] dark:text-[#666] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center gap-1">
              <Clock size={9} />
              {formatDate(chat.createdAt)}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(chat._id); }}
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 rounded-lg text-[#AAA] hover:text-red-400 hover:bg-red-500/10"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Preview text */}
        <p className="text-xs text-[#777] dark:text-[#666] leading-relaxed line-clamp-2">
          Chat session — click to continue this conversation
        </p>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${tagColors[tag] || tagColors.Recent}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent bar on hover */}
      <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent transition-all duration-500 ease-out" />
    </motion.div>
  );
};

// ─── Empty State ───────────────────────────────────────────────────────────────
const EmptyState = ({ query }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-24 gap-4 text-center"
  >
    <div className="w-16 h-16 rounded-2xl bg-[#F3F4F6] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#1E1E1E] flex items-center justify-center">
      <Search size={22} className="text-[#AAA] dark:text-[#555]" />
    </div>
    <div>
      <p className="text-sm font-semibold text-[#333] dark:text-[#EAEAEA]">
        {query ? `No results for "${query}"` : "No chats yet"}
      </p>
      <p className="text-xs text-[#888] dark:text-[#555] mt-1">
        {query ? "Try a different search term" : "Start a new chat to see it here"}
      </p>
    </div>
  </motion.div>
);

// ─── Main Search Page ──────────────────────────────────────────────────────────
const SearchPage = () => {
  const navigate = useNavigate();
  const { chats } = useSelector((state) => state.chat);
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const { handledeletechat, handlegetmessages } = useChat();

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(timer);
  }, [query]);

  // Filtered results
  const filtered = chats?.filter((c) =>
    c.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  ) ?? [];

  // Keyboard: "/" shortcut to focus search
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setQuery("");
      }
      if (e.key === "ArrowDown") {
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        setActiveIndex((i) => Math.max(i - 1, -1));
      }
      if (e.key === "Enter" && activeIndex >= 0 && filtered[activeIndex]) {
        handleCardClick(filtered[activeIndex]._id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filtered, activeIndex]);

  const handleCardClick = useCallback((chatId) => {
    handlegetmessages(chatId);
    navigate("/chat");
  }, [handlegetmessages, navigate]);

  const clearSearch = () => {
    setQuery("");
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-full w-full bg-[#F6F8FA] dark:bg-[#0B0B0B] transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-20">

        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap size={14} className="text-blue-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#888] dark:text-[#555]">
              Knowledge Base
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#EAEAEA] mb-2">
            Your Conversations
          </h1>
          <p className="text-sm text-[#888] dark:text-[#555]">
            {chats?.length ?? 0} total chats · Press <kbd className="px-1.5 py-0.5 rounded bg-[#E5E5E5] dark:bg-[#1E1E1E] text-[10px] font-mono">/</kbd> to search
          </p>
        </motion.div>

        {/* ── Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-2xl mx-auto mb-12"
        >
          <motion.div
            animate={{
              scale: isFocused ? 1.015 : 1,
              boxShadow: isFocused
                ? theme === "dark"
                  ? "0 0 0 1px rgba(99,102,241,0.35), 0 8px 32px rgba(0,0,0,0.5)"
                  : "0 0 0 1px rgba(99,102,241,0.25), 0 8px 24px rgba(0,0,0,0.08)"
                : "0 2px 8px rgba(0,0,0,0.06)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="flex items-center gap-3 rounded-full px-5 py-3.5
              bg-white/80 dark:bg-[#111]/80
              backdrop-blur-xl
              border border-[#E0E0E0] dark:border-white/[0.06]"
          >
            <motion.div
              animate={{ rotate: isFocused ? 10 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Search size={16} className={`transition-colors ${isFocused ? "text-blue-500" : "text-[#AAA] dark:text-[#555]"}`} />
            </motion.div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1); }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search conversations…"
              className="flex-1 bg-transparent text-sm text-[#111] dark:text-[#EAEAEA]
                placeholder-[#AAA] dark:placeholder-[#444]
                outline-none caret-blue-500"
            />

            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onClick={clearSearch}
                  className="p-1 rounded-full text-[#AAA] hover:text-[#555] dark:hover:text-[#AAA] hover:bg-[#F3F3F3] dark:hover:bg-[#1E1E1E] transition-colors"
                >
                  <X size={13} />
                </motion.button>
              )}
            </AnimatePresence>

            {!isFocused && !query && (
              <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono text-[#AAA] dark:text-[#555] bg-[#F5F5F5] dark:bg-[#1A1A1A] border border-[#E0E0E0] dark:border-[#2A2A2A] rounded-md px-1.5 py-0.5">
                /
              </kbd>
            )}
          </motion.div>

          {/* Keyboard nav hint */}
          <AnimatePresence>
            {isFocused && filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute right-4 -bottom-7 flex items-center gap-2 text-[10px] text-[#AAA] dark:text-[#555]"
              >
                <ArrowUp size={10} /> <ArrowDown size={10} /> navigate · Enter to open
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Results count ── */}
        <AnimatePresence mode="wait">
          <motion.p
            key={filtered.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-[#AAA] dark:text-[#555] mb-5 px-1"
          >
            {debouncedQuery
              ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${debouncedQuery}"`
              : `All conversations (${filtered.length})`
            }
          </motion.p>
        </AnimatePresence>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <EmptyState query={debouncedQuery} />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((chat, index) => (
                <ChatCard
                  key={chat._id}
                  chat={chat}
                  index={index}
                  query={debouncedQuery}
                  isActive={activeIndex === index}
                  onClick={() => handleCardClick(chat._id)}
                  onDelete={handledeletechat}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchPage;