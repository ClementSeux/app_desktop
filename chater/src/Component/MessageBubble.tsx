import React from '@vitejs/plugin-react';

type MessageBubbleProps = {
  message: string;
  isUser: boolean;
  user?: string;
  isLast?: () => boolean;
};

export default function MessageBubble  ({ message, isUser, isLast, user }: MessageBubbleProps) {
   
  return (   
   <p className={`message-bubble ${isUser ? 'right' : 'left'} ${isLast && isLast() ? 'last' : ''}`}>
      {message}
    </p>
  );
};
