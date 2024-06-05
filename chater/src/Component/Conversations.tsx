import React from '@vitejs/plugin-react';
import { Message } from '../Pages/Home';


interface Convprops {
    messages: Message[];
    getConvos: () => number[];
}

export default function Conversations({ messages, getConvos }: Convprops) {
    

    return (
        <div id='convlist'>
            {/* groUper les messages par convoId */}
            <div  className='chat'>
                {getConvos().map((convoId) => {
                    const list = messages.filter((message) => message.convoId === convoId);
                        return list[list.length - 1];
                    }).map((message) => {
                        return (
                            <div key={message.id}
                                onClick = {() => {
                                    console.log("Navigating to convo", message.convoId);
                                    window.location.href = (`/home?id=${message.convoId}`);
                                }
                            }
                                className={`convo ${message.seen ? "" : "new"}`}
                                ><h3>{message.author}</h3><p>{message.message.slice(0, 40)}...</p>
                            </div>
                        );
                })}
            </div>
        </div>
    );
}