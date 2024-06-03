import React from '@vitejs/plugin-react';
import MessageSendForm from '../Component/MessageSendForm';
import ChatContainer from '../Component/ChatContainer';


export default function Home() {

    return (
        <div id="home-screen">
            <ChatContainer />
            <MessageSendForm />
        </div>
    );
}