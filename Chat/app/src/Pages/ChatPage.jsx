import React, { useEffect, useState } from 'react'
import socketClient from "socket.io-client";
import Message from "./Message";

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
        <div className="chat">
            <div className="header">
                <h1>Chat</h1>
            </div>
            <div className="chatArea">
                <ul>
                    {chat.map((item, key) => (
                        <Message key={key} name={item.name} message={item.message} owner={item.name === userName ? "send" : "receive"} />
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
