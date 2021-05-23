const express = require("express")
const http = require("http");
const mysql = require("mysql")
const MySQLEvents = require("@rodrigogs/mysql-events")
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const socketIO = require("socket.io");
const io = socketIO.listen(server);
const {database} = require("./helpers");

//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));


// Define some arrray variables
let data = Array(0);
let currentDat = Array(0);

// Use Socket to setup the connection
io.sockets.on("connection",(socket)=>{
    database.table("product")
        .withFields(['id','name','price'])
        .sort({id:-1})
        .getAll()
        .then( prod =>{
            data = prod;
            io.sockets.emit("initial",{prod: [...data]});
        })
        .catch(err=>console.log(err));
})

const programm = async () =>{

}