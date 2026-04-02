import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Send, Share2, Share, Download, Copy, RotateCcw, ThumbsUp, ThumbsDown, MoreHorizontal, Check } from "lucide-react";
import useChat from "../hooks/chat.hook";
import Loader from "./Loader";
import VoiceInput from "./VoiceInput";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../../../contexts/ThemeContext";
import { setpreview } from "../chat.slice";

const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);


  const { theme } = useTheme()

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#F8F8F8] dark:bg-[#1A1A1A] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <span className="text-xs font-medium text-[#666] dark:text-[#999] uppercase tracking-wider">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[#666] dark:text-[#999] hover:text-[#111] dark:hover:text-white transition-colors text-xs font-medium focus:outline-none"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "javascript"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          background: theme === "dark" ? "transparent" : "#F5F5F5",
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

// Markdown components for professional look
const markdownComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const value = String(children).replace(/\n$/, "");
    return !inline && match ? (
      <CodeBlock language={match[1]} value={value} {...props} />
    ) : (
      <code
        className={`${className} bg-[#F3F3F3] dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded text-[#E01E5A] dark:text-[#FF79C6] font-mono text-[0.9em] transition-colors duration-500`}
        {...props}
      >
        {children}
      </code>
    );
  },
  p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
  h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 text-black dark:text-white">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 text-black dark:text-white">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4 text-black dark:text-white">{children}</h3>,
  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#DDD] dark:border-[#333] pl-4 italic my-4 text-[#555] dark:text-[#AAA]">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
    >
      {children}
    </a>
  ),
  img: (props) => {
    const { src, alt } = props;
    return (
      <div className="my-6 rounded-2xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-md group relative max-w-lg mx-auto">
        <img
          src={src}
          alt={alt || "AI Generated Art"}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            console.error("Image failed to load:", src);
          }}
        />
        <div className="absolute top-3 right-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#111] dark:text-white bg-white/60 dark:bg-black/60 px-3 py-1 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Generative Art
          </span>
        </div>
      </div>
    );
  },
};

// Skeleton loader for AI response
const MessageSkeleton = () => (
  <div className="flex flex-col gap-2 w-full max-w-2xl animate-pulse-soft">
    <div className="h-4 bg-[#E5E5E5] dark:bg-[#1F1F1F] rounded-full w-3/4 transition-colors duration-500" />
    <div className="h-4 bg-[#E5E5E5] dark:bg-[#1F1F1F] rounded-full w-full transition-colors duration-500" />
    <div className="h-4 bg-[#E5E5E5] dark:bg-[#1F1F1F] rounded-full w-5/6 transition-colors duration-500" />
    <div className="h-4 bg-[#E5E5E5] dark:bg-[#1F1F1F] rounded-full w-2/3 transition-colors duration-500" />
  </div>
);


// Format text with basic markdown-like rendering
// Retired in favor of ReactMarkdown
const MessageActions = ({ content }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <div className="flex items-center justify-between mt-4 pt-2 text-[#555] border-t border-transparent hover:border-[#1F1F1F] transition-all">
      <div className="flex items-center gap-4">
        <button className="hover:text-[#888] transition-colors" title="Share">
          <Share size={15} />
        </button>
        <button className="hover:text-[#888] transition-colors" title="Download">
          <Download size={15} />
        </button>
        <button onClick={handleCopy} className="hover:text-[#888] transition-colors" title="Copy">
          {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
        </button>
        <button className="hover:text-[#888] transition-colors" title="Reload">
          <RotateCcw size={15} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          className={`transition-all ${liked ? "text-[#EAEAEA]" : "hover:text-[#888]"}`}
          title="Good response"
        >
          <ThumbsUp size={15} fill={liked ? "currentColor" : "none"} />
        </button>
        <button
          onClick={handleDislike}
          className={`transition-all ${disliked ? "text-[#EAEAEA]" : "hover:text-[#888]"}`}
          title="Bad response"
        >
          <ThumbsDown size={15} fill={disliked ? "currentColor" : "none"} />
        </button>
        <button className="hover:text-[#888] transition-colors">
          <MoreHorizontal size={15} />
        </button>
      </div>
    </div>
  );
};

const ChatUI = () => {
  const { messages, currentChat, loading, streamStarted, chats, preview } = useSelector((s) => s.chat);
  const { handlesendmessage } = useChat();
  const [text, setText] = useState("");
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch()

  const handlesetfile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFile(file)

    }
  }

  // Get current chat title - handle both ID and Object cases for currentChat
  const chatTitle = (() => {
    if (!currentChat) return "Knowledge";
    const chatId = typeof currentChat === "object" ? currentChat._id : currentChat;
    const found = chats?.find((c) => c._id === chatId);
    return found?.title || "Knowledge";
  })();

  // Flawless scrolling mechanism preventing rapid animation shakes
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    // Spamming behavior: "smooth" twenty times a second during streaming forces 
    // the browser to constantly interrupt and recalculate bezier curves, causing shaking/jitter.
    if (streamStarted) {
      // By instantly locking scrollTop while the text naturally heightens pixel-by-pixel, 
      // the browser organically creates a perfectly smooth visual glide without animation thrashing.
      container.scrollTop = container.scrollHeight;
    } else {
      // Use smooth glide only for initial actions (e.g., sending first message, generating loader)
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, loading, streamStarted]);

  const handleSend = async () => {
    if (!text.trim() && !file) return;
    const msg = text.trim();
    setText("");

    // Ensure we pass the ID string
    const chatId = typeof currentChat === "object" ? currentChat?._id : currentChat;

    if (file) {
      const url = URL.createObjectURL(file)
      dispatch(setpreview(url))
    }

    const formData = new FormData();
    formData.append("message", msg);
    if (file) formData.append("file", file);

    await handlesendmessage(formData, chatId);
    setFile(null); // Clear file after sending
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const [copy, setCopy] = useState(false);

  const handlecopyShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 2000);
  }

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] dark:border-[#1F1F1F] shrink-0 transition-colors duration-500">
        <h2 className="text-[#111] dark:text-[#EAEAEA] font-semibold text-base transition-colors duration-500">{chatTitle}</h2>
        <button
          onClick={handlecopyShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#555] dark:text-[#888] text-sm hover:border-[#CCC] dark:hover:border-[#3A3A3A] hover:text-[#111] dark:hover:text-[#EAEAEA] transition-all duration-500">
          {copy ? <Check size={14} className="text-green-500 cursor-pointer" /> : <Share2

            size={14} />}
          {copy ? "Copied Link to Clipboard" : "Share"}
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar overflow-x-hidden scrollbar-minimal px-6 py-6 flex flex-col gap-6"
      >
        {messages.map((msg, i) => (
          <div
            key={msg._id || i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up scroll-mt-20`}
          >

            {msg.role === "user" ? (
              <div className="max-w-xs md:max-w-md lg:max-w-lg bg-[#e2dada] dark:bg-[#18181B] text-[#111] dark:text-[#EAEAEA] rounded-2xl rounded-br-none px-4 py-3 text-sm leading-relaxed transition-colors duration-500">
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Uploaded"
                    className="mb-2 rounded-lg max-w-full h-auto border border-black/5 dark:border-white/5"
                  />
                )}
                {msg.content}
              </div>
            ) : (
              <div className="w-full max-w-2xl">

                <div className="markdown-content text-[#111] dark:text-[#EAEAEA] text-sm transition-colors duration-500">
                  <ReactMarkdown components={markdownComponents}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
                {/* Hide action buttons until the AI completely finishes typing this response */}
                {!(i === messages.length - 1 && (loading || streamStarted)) && (
                  <MessageActions content={msg.content} />
                )}
              </div>
            )}
          </div>
        ))}

        {/* Loading skeleton */}
        {loading && !streamStarted && (
          <div className="flex flex-col items-start w-full gap-4 md:m-3 animate-slide-up">
            {/* <Loader /> */}
            <div className="flex items-center gap-3 animate-pulse">
              <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium tracking-tight">
                AI is thinking
                <span className="inline-flex items-center ml-1">
                  <span className="animate-[bounce_1s_infinite_0ms]">.</span>
                  <span className="animate-[bounce_1s_infinite_200ms]">.</span>
                  <span className="animate-[bounce_1s_infinite_400ms]">.</span>
                </span>
              </p>
            </div>
            <MessageSkeleton />
          </div>

        )}
      </div>

      {/* Input bar (sticky bottom) */}
      <div className="shrink-0 px-6 py-4 border-t border-[#E5E5E5] dark:border-[#1F1F1F] transition-colors duration-500 relative">
        <div className="bg-white dark:bg-[#0B0B0B] border border-[#E5E5E5] dark:border-[#222] rounded-2xl p-4 shadow-lg transition-colors duration-500">

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
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up"
            className="w-full bg-transparent text-[#111] dark:text-[#EAEAEA] placeholder-[#888] dark:placeholder-[#444] resize-none outline-none text-sm leading-relaxed scrollbar-none transition-colors duration-500"
          />
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={() => fileRef.current.click()}
              className="flex items-center gap-1.5 text-[#555] hover:text-[#888] text-sm transition-colors">
              <Plus size={16}

              />
              Attach
            </button>
            <input type="file" ref={fileRef} className="hidden" onChange={(e) => handlesetfile(e)} />
            <div className="flex items-center gap-2">
              <VoiceInput text={text} setText={setText} busy={loading || streamStarted} />
              <button
                onClick={handleSend}
                disabled={(!text.trim() && !file) || loading}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
                  ${(text.trim() || file) && !loading
                    ? "bg-[#111] text-white dark:bg-[#EAEAEA] dark:text-[#0B0B0B] hover:bg-black dark:hover:bg-white"
                    : "bg-[#F5F5F7] text-[#CCC] dark:bg-[#222] dark:text-[#555] cursor-not-allowed"
                  }`}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
