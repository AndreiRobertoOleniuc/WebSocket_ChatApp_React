import React, { useEffect, useState } from 'react'
import socketClient from "socket.io-client";

function ChatPage({ userName }) {
    const [chat, setChat] = useState([]);
    const [input, setInput] = useState("");
    const socket = socketClient("ws://localhost:8080");

    useEffect(() => {
        getOldMessages();
        connectToChat();
    }, []);

    const connectToChat = () => {
        socket.on("message", data => {
            console.log("This is the pres Chat: " + chat);
            console.log(data);
            setChat(chat => [...chat, data]);
        })
    }
    const getOldMessages = () => {
        fetch("http://localhost:8080/getAllMessages")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setChat(data);
            });
    }
    const sendMessage = () => {
        socket.emit("message", { name: userName, message: input });
    }
    return (
        <div>
            <div className="header">
                <h1>Chat</h1>
            </div>
            <div className="chatArea">
                <ul>
                    {chat.map((item, key) => (
                        <div key={key}>
                            <p>{item.name}</p>
                            <h3>{item.message}</h3>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="inputs">
                <input type="text" onChange={(e) => { setInput(e.target.value) }}
                    onKeyPress={(e) => { if (e.key === "Enter") { sendMessage() } }} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage
