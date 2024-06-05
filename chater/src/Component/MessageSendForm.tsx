import React from 'react';
import { useState } from 'react';
import { useSocket } from '../Hooks/useSocketProvider';

interface MessageSendFormProps {
    convoId: number;
}

const MessageSendForm = ({ convoId }: MessageSendFormProps) => {
 
  const [message, setMessage] = useState<string>("");
  const socket = useSocket();

  const sendMessage = () => {
    socket.send( message, "Clement", convoId);
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