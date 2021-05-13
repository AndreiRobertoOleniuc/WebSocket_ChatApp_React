//We get Express and Create an Express App
const express = require('express');
const app = express();
//We get HTTP and Cros to use both with Express and Socket.io
const http = require('http');
var cors = require('cors')
//We create the Server
const server = http.createServer(app);
//We enable Cors
app.use(cors())
const io = require("socket.io")(server,{
    cors:{origin:"*"}
});


//We set Express to Format in JSON
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send({
        name:`Server`,
        message:`Hello G`
    })
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

//We start the Server
server.listen(8080, () => {
  console.log('listening on *:8080');
});