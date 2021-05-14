const socket = io("ws://localhost:8080");

socket.on('message',text=>{
    const el = document.createElement("li");
    el.innerHTML = text;
    document.querySelector("ul").appendChild(el);
})

document.getElementById('normalchat').onclick = () =>{
    const text = document.getElementById('normalchatInput').value;
    socket.emit('message',text);
}


socket.on("smallchat",text=>{
    console.log(text);
})

document.getElementById("smallchat").onclick = () =>{
    const text = document.getElementById("smallChatInput").value;
    socket.emit("smallchat",text);
}