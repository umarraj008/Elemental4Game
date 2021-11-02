//Constant variables for server
const User = require("./User");
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
var games = {};
//var rooms = io.sockets.adapter.rooms;

io.sockets.on("connection", function(socket) {
    console.log("Player has connected to the server");

    socket.on("join-server", function() {
        let player = new User(socket);
        players.set(socket.id, player);
    });

    socket.on("matchmake", function() {
        let player = findPlayer(socket.id);
        matchmakingQueue.push(player);

        if (matchmakingQueue.length >= 2) {

            //make game id
            let gameID = makeGameID();

            //make players join room
            //matchmakingQueue[0].socket.join(gameID);
            //matchmakingQueue[1].socket.join(gameID);
            
            //make new game
            var game = new Game(gameID, matchmakingQueue[0].socket, matchmakingQueue[1].socket);
            findPlayer(matchmakingQueue[0].socket.id).gameID = gameID;
            findPlayer(matchmakingQueue[1].socket.id).gameID = gameID;
            
            //remove players from matchmaking queue
            matchmakingQueue.splice(0,2);

            //set game
            games[gameID] = game;
            games[gameID].startGame();
        }
    });

    socket.on("disconnect", function(socket) {
        //remove player
        // try {
        //     var gameID = findPlayer(socket.id).gameID;
        //     if (gameID != null) {
        //         games[gameID].sendMessageToBothPlayers("game-canceled");
        //     }
        // } catch(e) {

        // }
        players.delete(socket.id);
    });

    socket.on("player-selected", function(data) {
        games[data.id].playerSelected(socket.id, data.type);
    });

    socket.on("player-action", function(data) {
        games[data.id].playerAction(data.action);
    });
});

function findGame(id) {
    return games.get(id);
}

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