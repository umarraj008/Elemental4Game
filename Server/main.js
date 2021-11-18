//Constant variables for server
const User = require("./User");
const Game = require("./Game");
const mysql = require("mysql");
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

//database setup
const db = mysql.createConnection({
    host: "localhost",
    database: "elemental4db",
    user: "root",
    password: "",
});

//check database connection
db.connect((e => {
    if (e) { console.log("Error connecting to database"); } else { console.log("Connected to database"); }
}));

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
            var game = new Game(gameID, matchmakingQueue[0].socket, matchmakingQueue[0].name, matchmakingQueue[1].socket, matchmakingQueue[1].name);
            findPlayer(matchmakingQueue[0].socket.id).gameID = gameID;
            findPlayer(matchmakingQueue[1].socket.id).gameID = gameID;
            
            //remove players from matchmaking queue
            matchmakingQueue.splice(0,2);

            //set game
            games[gameID] = game;
            games[gameID].startGame();
        }
    });

    socket.on("disconnect", function() {
        let player = findPlayer(socket.id);
        //if player is in matchmaking queue
        for (i = 0; i < matchmakingQueue.length; i++) {
            if (matchmakingQueue[i].socket.id == socket.id) {
                matchmakingQueue.splice(i, 1);
                break;
            }
        }

        //if player was in a game then end match
        if (games[player.gameID] != null || games[player.gameID] != undefined) {
            games[player.gameID].matchCancelled(socket.id);
            delete games[player.gameID];
            //console.log("match cancelled");
        }
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
    return games[id];
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