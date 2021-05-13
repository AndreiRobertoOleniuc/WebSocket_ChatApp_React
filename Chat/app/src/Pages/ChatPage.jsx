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
            <h1>Chat</h1>
            <ul>
                {chat.map((item, key) => (
                    <div key={key}>
                        <p>{item.name}</p>
                        <h3>{item.message}</h3>
                    </div>
                ))}
            </ul>
            <input type="text" name="" id="" onChange={(e) => { setInput(e.target.value) }} />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default ChatPage
