import { useState, useRef } from "react";
import { Plus, Mic, Send, Globe, BookOpen, Cpu, Smartphone, Mail } from "lucide-react";
import useChat from "../hooks/chat.hook";
import { useDispatch } from "react-redux";
import { setpreview } from "../chat.slice";

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

const categories = [
  { icon: <Globe size={14} />, label: "Trending Tech" },
  { icon: <BookOpen size={14} />, label: "Startups" },
  { icon: <Cpu size={14} />, label: "AI Tools" },
  { icon: <Smartphone size={14} />, label: "Gadgets" },
];

const suggestedPrompts = [
  "Summarize this: TechCrunch | Startup and Technology News",
  "Tell me more about Technology - WSJ.com...",
  "What are the top 5 programming news today?",
  "Explain the latest tech market shifts",
  "Search for best developer tools 2026",
];

const sourceCards = [
  {
    icon: <Globe size={18} className="text-[#888]" />,
    title: "TechCrunch | Startup and Technology News",
    meta: "NEWS · TECHCRUNCH.COM",
  },
  {
    icon: <BookOpen size={18} className="text-[#888]" />,
    title: "Technology - WSJ.com",
    meta: "NEWS · WSJ.COM",
  },
  {
    icon: <Globe size={18} className="text-[#888]" />,
    title: "Technology - The New York Times",
    meta: "NEWS · NYTIMES.COM",
  },
  {
    icon: <Globe size={18} className="text-[#888]" />,
    title: "Latest Technology News and Reviews - Yahoo Finance",
    meta: "NEWS · FINANCE.YAHOO.COM",
  },
];

const capabilities = [
  {
    // icon: <Instagram size={18} className="text-red-400" />,
    label: "Post to Instagram",
    desc: "Instantly create and publish image posts directly to your Instagram account.",
    iconBg: "bg-red-500/10",
  },
  {
    icon: <Mail size={18} className="text-red-400" />,
    label: "Send Emails",
    desc: "Draft and send professional emails straight from the chat interface.",
    iconBg: "bg-red-500/10",
  },
];

const HomeUI = () => {
  const [query, setQuery] = useState("");
  const { handlesendmessage } = useChat();
  const inputRef = useRef(null);

const [file,setFile]=useState(null);
const refu=useRef(null);

const dispatch=useDispatch()

  const handleSubmit = async () => {

    const formData=new FormData();
    formData.append("file",file);
    formData.append("message",query);
    const url=URL.createObjectURL(file)
    dispatch(setpreview(url))

    if (!query.trim()) return;
    await handlesendmessage(formData,null);
    setQuery("");
    setFile(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePromptClick = async (prompt) => {
    await handlesendmessage(prompt, null);
  };

  return (
    <div className="min-h-full flex flex-col items-center pt-16 pb-12 px-6 max-w-3xl mx-auto w-full animate-fade-in">
      {/* Logo + Name */}
      <div className="flex flex-col items-center mb-10">
        <PerplexityLogo className="w-16 h-16 text-[#111] dark:text-[#EAEAEA] mb-4 transition-colors duration-500" />
        <h1 className="text-5xl md:text-6xl font-bold text-[#111] dark:text-[#EAEAEA] tracking-tight transition-colors duration-500">
          Khanplexity
        </h1>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => handlePromptClick(cat.label)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#121212] text-[#555] dark:text-[#AAAAAA] text-sm hover:border-[#CCC] dark:hover:border-[#3A3A3A] hover:text-[#111] dark:hover:text-[#EAEAEA] transition-all duration-500"
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="w-full relative  bg-white dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#222] rounded-2xl p-4 mb-6 shadow-lg transition-colors duration-500">
          {file && (
            <div className="mb-2 p-2 bg-neutral-100 dark:bg-[#1A1A1A] rounded-lg flex items-center justify-between">
            <span className="text-xs text-neutral-500 truncate max-w-[200px]">{file.name}</span>
            <button 
              onClick={() => setFile(null)} 
              className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
              Remove
            </button>
          </div>
        )}
        <textarea
          ref={inputRef}
          rows={2}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="w-full bg-transparent text-[#111] dark:text-[#EAEAEA] placeholder-[#888] dark:placeholder-[#444] resize-none outline-none text-base leading-relaxed scrollbar-none transition-colors duration-500"
        />

        <input type="file" ref={refu}  onChange={(e)=>setFile(e.target.files[0]) } className="hidden" />
        <div className="flex items-center justify-between mt-2">
          <button
          onClick={()=>refu.current.click()}
          className="text-[#555] hover:text-[#888] transition-colors p-1">
            <Plus size={20} />
          </button>
          <div className="flex items-center gap-2">
            <button className="text-[#555] hover:text-[#888] transition-colors p-1.5">
              <Mic size={18} />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!query.trim()}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
                ${query.trim()
                  ? "bg-[#111] text-white dark:bg-[#EAEAEA] dark:text-[#0B0B0B] hover:bg-black dark:hover:bg-white"
                  : "bg-[#F5F5F7] text-[#CCC] dark:bg-[#222] dark:text-[#555] cursor-not-allowed"
                }`}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Suggested prompts */}
      <div className="w-full flex flex-col mb-8">
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handlePromptClick(prompt)}
            className="text-left text-[#4A9EFF] text-sm py-3 border-b border-[#E5E5E5] dark:border-[#1A1A1A] last:border-0 hover:text-blue-300 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Source cards */}
      <div className="w-full grid grid-cols-2 gap-3 mb-8">
        {sourceCards.map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#1F1F1F] rounded-xl p-4 flex flex-col gap-3 hover:border-[#CCC] dark:hover:border-[#2A2A2A] hover:bg-[#F5F5F7] dark:hover:bg-[#141414] transition-all duration-500 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F7] dark:bg-[#1A1A1A] flex items-center justify-center transition-colors duration-500">
                {card.icon}
              </div>
              <svg
                className="w-4 h-4 text-[#444] group-hover:text-[#666] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </div>
            <div>
              <p className="text-[#111] dark:text-[#EAEAEA] text-sm font-medium leading-tight mb-1 transition-colors duration-500">
                {card.title}
              </p>
              <p className="text-[#555] text-xs tracking-wide">{card.meta}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Capabilities */}
      <div className="w-full">
        <p className="text-[#555] text-xs font-semibold tracking-widest uppercase mb-3">
          Capabilities
        </p>
        <div className="grid grid-cols-2 gap-3">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#1F1F1F] rounded-xl p-4 flex flex-col gap-3 hover:border-[#CCC] dark:hover:border-[#2A2A2A] hover:bg-[#F5F5F7] dark:hover:bg-[#141414] transition-all duration-500 cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-lg ${cap.iconBg} flex items-center justify-center`}
              >
                {cap.icon}
              </div>
              <div>
                <p className="text-[#111] dark:text-[#EAEAEA] text-sm font-medium mb-1 transition-colors duration-500">
                  {cap.label}
                </p>
                <p className="text-[#555] text-xs leading-relaxed">{cap.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeUI;
