import React from '@vitejs/plugin-react';
import MessageBubble from '../Component/MessageBubble';
import { useSocket , AppSocket} from '../Hooks/useSocketProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { Message } from '../Pages/Home';



export default function ChatContainer({convoId, messages} : {convoId: number | null, messages: Message[]}) {
   
    return (
        <div id='chat-container'>
            {messages.map((message, index) => (
                <MessageBubble key={index} 
                    message={message.message} 
                    isUser={message.author == "Clement"} 
                    isLast={() => {
                        if (index == messages.length - 1) {
                            return true;
                        } else {
                            if (messages[index + 1].author == message.author) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }
                    }                   
                    user={message.author} />
            ))}
        </div>
    );
}