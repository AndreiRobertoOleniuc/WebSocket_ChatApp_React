import React, { useEffect } from 'react'
import socketClient from "socket.io-client";

function ChatPage({ userName }) {
    useEffect(() => {
        getOldMessages();
        connectToChat();
    }, []);

    const connectToChat = () => {
        const socket = socketClient("ws://localhost:8080");
        socket.on("message", data => {
            console.log(data);
        })
    }
    const getOldMessages = () => {
        
    }
    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default ChatPage
