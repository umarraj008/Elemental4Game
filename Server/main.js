//Constant variables for server
const Player = require("./Player");
const Game = require("./Game");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const address = "localhost";

//Server listening on address
const server = app.listen(port, () => {
    console.clear();
    console.log("Server has started.");
    console.log("Listening at: " + address + ":" + port);
});

let path = __dirname.substr(0,__dirname.length-6) + "Public";
app.use(express.static(path));
app.get('/', function(req, res,next) {  
    res.sendFile(path);
});

//app.use(express.static("../Public"));
const io = require("socket.io")(server);

//list of players connected to the server
var players = new Map();
var matchmakingQueue = [];

io.sockets.on("connection", function(socket) {
    console.log("Player has connected to the server");

    socket.on("join-server", function() {
        let player = new Player(socket);
        players.set(socket.id, player);
    });

    socket.on("matchmake", function() {
        let player = findPlayer(socket.id);
        matchmakingQueue.push(player);

        if (matchmakingQueue.length >= 2) {
            let gameID = makeGameID();
            matchmakingQueue[0].socket.join(gameID);
            matchmakingQueue[1].socket.join(gameID);
            matchmakingQueue.splice(0,2);
            console.log("room created: " + gameID);
        }
    });

    socket.on("disconnect", function(socket) {
        //remove player
        players.delete(socket.id);
    });
});

function findPlayer(id) {
    return players.get(id);
}

function makeGameID() {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = "";
    
    for (let i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return id;
}