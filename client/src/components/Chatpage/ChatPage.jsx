// pages/chatPage/ChatPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import apiRequest from "../../lib/apiRequest";

function ChatPage() {
  const { chatId } = useParams();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await apiRequest.get("/chats");
        setChats(res.data);
      } catch (err) {
        console.log("Failed to fetch chats:", err);
      }
    };

    fetchChats();
  }, []);

  return <Chat chats={chats} />;
}

export default ChatPage;
