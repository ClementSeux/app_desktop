import React from '@vitejs/plugin-react';
import { useEffect, useState } from 'react';
import { useSocket } from '../Hooks/useSocketProvider';
import MessageSendForm from '../Component/MessageSendForm';
import ChatContainer from '../Component/ChatContainer';
import Conversations from '../Component/Conversations';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';



export type Message = {
    id: number;
    message: string;
    author: string;
    convoId: number;
    seen: boolean;
}

export default function Home() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const  id  = urlParams.get('id')
    console.log('param fovnd', id);

    const [selectedConvo, setSelectedConvo] = useState<number | null>(id ? parseInt(id) : 4529);
    const [messages, setMessages] = useState([
        {id : 1, message : "Hello darkness my old friend. How are you doing on this desperately depressing night ?", author : "Clement", convoId : 4529, seen : false},
        {id : 2, message : "Hi", author : "Thanos", convoId : 4529, seen : false},
        {id : 3, message : "I'm doing fine, thank you for asking. How about you ?", author : "Alice", convoId : 4526, seen : false},
    ]);
    const socket = useSocket();

    function getConvos() {
        const convosList : number[] = [];
        for (const message of messages) {
            if (!convosList.includes(message.convoId)) {
                convosList.push(message.convoId);
            }
        }
        return convosList;
    }
    useEffect(() => {
        const handleMessages = (msg: string, sender: string, convoId: number) => {
            console.log("Received message from", sender, ":", msg);
            setMessages((prevMessages) => [...prevMessages, 
                {id : prevMessages.length + 1, 
                    message : msg , 
                    author : sender ,
                    convoId : convoId,
                    seen : false}]);

        }

        return socket.onMessage(handleMessages);
    }, [socket]);

    useEffect(() => {
        console.log(messages);
    }
    , [messages]);

    return (
        <div id="home-screen">
            <Conversations messages={messages} getConvos={getConvos} />
            <main >
                <ChatContainer convoId={selectedConvo} messages={messages.filter((message) => message.convoId === selectedConvo)} />
                <MessageSendForm convoId={selectedConvo} />
            </main>
        </div>
    );
}