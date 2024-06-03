import React from 'react';
import { useState } from 'react';
import { useSocket } from '../Hooks/useSocketProvider';


const MessageSendForm = () => {
  const [message, setMessage] = useState<string>("");
  const socket = useSocket();

  const sendMessage = () => {
    socket.send( message);
    setMessage("");
  };


  return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (message.trim() === "") return;
          sendMessage();
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='...'
        />
        <button onClick={sendMessage}>Send</button>
      </form>
  );
};

export default MessageSendForm;