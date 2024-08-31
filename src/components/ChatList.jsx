import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchChats } from "../redux/chat/chatSlice";
import { fetchUsers } from "../redux/user/userSlice";
import styles from "../styles/ChatList.module.css";
import image from "../assets/1.jpeg";

const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channels, status } = useSelector((state) => state.chat);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchChats());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChatClick = (channel) => {
    const userData = {
      chat_id: "kijyrdjzj3yo8xe9eh9dwkyjza",
      token: "9d18iaro8bdq98y8o9bksoy8qa",
      chat_server: {
        path: "api/v4",
        port: "443",
        scheme: "https",
        url: "mm.hamafza-startup.ir",
        ws_path: "api/v4/websocket",
        ws_scheme: "wss",
      },
    };

    console.log("Navigating to chat page with:", { channel, userData });
    navigate(`/chat/${channel.channel_id}`, { state: { channel, userData } });
  };

  return (
    <div className={styles.container}>
      {status === "loading" ? (
        <p>در حال بارگذاری کانال‌ها...</p>
      ) : (
        <div className={styles.chatListContainer}>
          {channels.map((channel) => (
            <div
              key={channel.channel_id}
              onClick={() => handleChatClick(channel)}
              className={styles.chatItem}
            >
              <div className={styles.avatar}>
                <img src={image} alt="Avatar" />
              </div>
              <div className={styles.chatInfo}>
                <h3 className={styles.chatName}>
                  {channel.display_name.split("#")[0]}
                </h3>
                <p className={styles.lastMessage}>{channel.purpose}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
