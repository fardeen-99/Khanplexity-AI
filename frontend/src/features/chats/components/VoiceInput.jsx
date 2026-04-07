import { useState, useRef, useEffect } from "react";
import { Loader2, Mic, Square } from "lucide-react";

export default function VoiceInput({ text, setText, busy = false }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    
    // Most standard wide-support language setting
    recognition.lang = window.navigator.language || "en-US"; 
    
    // Crucial UX fix: Continuous ensures the mic doesn't randomly stop when you pause briefly
    recognition.continuous = false; 
    
    // Shows the words live as you speak for instant feedback
    recognition.interimResults = false;

    // Capture what's already in the text box so we don't accidentally overwrite it
    let baseTranscript = text ? text + (text.endsWith(" ") ? "" : " ") : "";

    recognition.onstart = () => {
      setListening(true);
    };

recognition.onresult = (event) => {
  let finalTranscript = "";

  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      finalTranscript += event.results[i][0].transcript;
    }
  }

  if (finalTranscript) {
    setText((prev) => {
      // 🛑 hardcore duplicate filter
      if (prev.includes(finalTranscript.trim())) {
        return prev;
      }
      return prev + " " + finalTranscript;
    });
  }
};

    recognition.onerror = (err) => {
      console.error("Speech error details:", err);
      if (err.error === 'not-allowed' || err.error === 'aborted') {
        setListening(false);
      }
    };

    recognition.onend = () => {
      // Cleanly update state if the browser decides to stop recording
      setListening(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (error) {
      console.error("Mic start error:", error);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  };

  // Turn off microphone if user switches chats or closes the component
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <button
      onClick={listening ? stopListening : startListening}
      type="button"
      disabled={busy && !listening}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 relative ${
        listening
          ? "bg-red-500/10 text-red-500 dark:bg-red-500/20 active:scale-95 shadow-inner"
          : busy
            ? "bg-transparent text-[#AAA] dark:text-[#555] cursor-not-allowed"
            : "bg-transparent text-[#555] hover:text-[#111] dark:text-[#888] dark:hover:text-[#EAEAEA] hover:bg-[#F5F5F7] dark:hover:bg-[#222]"
      }`}
      title={
        listening
          ? "Stop recording (Mic Active)"
          : busy
            ? "Working…"
            : "Voice input"
      }
    >
      {listening ? (
        <>
          <Square size={15} fill="currentColor" className="relative z-10" />
          <span className="absolute inset-0 rounded-full animate-ping bg-red-500/30"></span>
        </>
      ) : busy ? (
        <Loader2 size={15} className="animate-spin" />
      ) : (
        <Mic size={15} />
      )}
    </button>
  );
}
