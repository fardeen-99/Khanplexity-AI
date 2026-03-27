import { useEffect } from "react";
import { useSelector } from "react-redux";
import useChat from "../hooks/chat.hook";
import HomeUI from "../components/HomeUI";
import ChatUI from "../components/ChatUI";

const Chat = () => {
  const { messages, currentChat } = useSelector((state) => state.chat);
  const { handlegetallchats } = useChat();

  useEffect(() => {
    handlegetallchats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determine if we should show Home or Chat UI
  const showHome = messages.length === 0 && !currentChat;

  return (
    <>
      {showHome ? (
        <HomeUI />
      ) : (
        <div className="flex flex-col h-dvh">
          <ChatUI />
        </div>
      )}
    </>
  );
};

export default Chat;