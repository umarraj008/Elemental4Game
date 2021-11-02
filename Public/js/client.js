const address = "http://localhost";
const port = "3000";
const socket = io(address + ":" + port, { transports : ['websocket'] });
var gameID = "";
var game = {
    points: 0,
    health: 0,
    turn: false,
}

socket.on("connect", function() {
    console.log("connected to server");
    socket.emit("join-server");
});

socket.on("disconnect", function() {
    console.log("disconnected to server");
});

socket.on("pick-character", function(gID) {
    console.log("pick your character");
    gameID = gID;
});

socket.on("player2-turn", function() {
    console.log("player2 turn")
});


socket.on("player1-turn", function() {
    console.log("player1 turn")
});

socket.on("game-update", function(data) {
    game.points = data.points;
    game.health = data.health;
    game.turn = data.turn;
});

socket.on("game-canceled", function() {
    sceneManager.scene = 4
    gameID = "";
});

function matchmake() {
    socket.emit("matchmake");
}

function selectPlayer(which) {
    socket.emit("player-selected", {id: gameID, type: which});
}

function action(which) {
    socket.emit("player-action", {id: gameID, action: which});
}