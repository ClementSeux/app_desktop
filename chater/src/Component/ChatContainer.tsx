import React from '@vitejs/plugin-react';
import MessageBubble from '../Component/MessageBubble';
import { useSocket , AppSocket} from '../Hooks/useSocketProvider';
import { useEffect } from 'react';
import { useState } from 'react';



export default function ChatContainer() {
    const [messages, setMessages] = useState([
        {id : 1, message : "Hello darkness my old friend. How are you doing on this desperately depressing night ?", author : "Clement"},
        {id : 2, message : "Hi", author : "Thanos"}
    ]);
    const socket = useSocket();
    useEffect(() => {
        const handleMessages = (msg: string, sender: string) => {
            console.log("Received message from", sender, ":", msg);
            setMessages((prevMessages) => [...prevMessages, 
                {id : prevMessages.length + 1, message : msg , author : sender}]);

        }

        return socket.onMessage(handleMessages);
    }, [socket]);

    useEffect(() => {
        console.log(messages);
        
    }
    , [messages]);

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