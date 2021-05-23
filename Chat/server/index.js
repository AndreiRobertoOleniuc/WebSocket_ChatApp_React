const express = require('express');
const app = express();
const http = require('http');
var cors = require('cors')
const server = http.createServer(app);
app.use(cors())
const io = require("socket.io")(server,{
    cors:{origin:"*"}
});
app.use(express.json())

const chat = [];

app.get("/getAllMessages",(req,res)=>{
    res.status(200).send(chat);
})

app.get("/",(req,res)=>{
    res.status(200).send("Test");
})

io.on('connection',(socket)=>{  
    socket.on('message',(message)=>{
        console.log(message);
        chat.push(message);
        io.emit("message",message);
    }); 
})

server.listen(8080, () => {
  console.log('listening on *:8080');
});