const express = require('express');
const app = express();
const http = require('http');
var cors = require('cors')
app.use(cors())
const server = http.createServer(app);
const io = require("socket.io")(server,{
    cors:{origin:"*"}
});


app.get('/', (req, res) => {
    res.send('Hello');
});

io.on('connection',(socket)=>{  
    console.log("a user connected");

    socket.on('message',(message)=>{
        console.log(message);
        io.emit("message",`${message}`);
    });

    socket.on("smallchat",(message)=>{
        console.log(message);
        io.emit("smallchat",`New message: ${message}`);
    })
})

server.listen(8080, () => {
  console.log('listening on *:8080');
});