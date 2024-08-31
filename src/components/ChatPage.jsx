import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/ChatPage.module.css";

const ChatPage = () => {
  const location = useLocation();
  const { channel, userData } = location.state;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const { channel, userData } = location.state;

    if (!userData || !channel) {
      console.error("Missing required data for WebSocket connection.");
      return;
    }

    const { chat_id, token, chat_server } = userData;

    const wsUrl = `${chat_server.ws_scheme}://${chat_server.url}/${chat_server.ws_path}?id=${chat_id}&token=${token}`;
    console.log("Connecting to WebSocket at:", wsUrl);

    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket closed");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [location.state]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        channel_id: channel.channel_id,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };

      socketRef.current.send(JSON.stringify(messageData));
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <h2>{channel.display_name.split("#")[0]}</h2>
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your message"
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
