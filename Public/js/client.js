const address = "http://192.168.1.176";
const port = "3000";
const socket = io(address + ":" + port, { transports : ['websocket'] });
var gameID = "";
var game = {
    points: 0,
    health: 0,
    turn: false,
    winner: null,
    over: false,
    whichPlayerAmI: null,
    map: 0,
    player2: {health:100,points:5},
    characterType: null,
    player2characterType: null,
    win: null,
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
    sceneManager.scene = 6;
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

    if (data.turn && sceneManager.bot) sceneManager.botSelected = false;
});

socket.on("game-over", function(data) {
    // game.over = true;
    // game.winner = data.winner;

    // window.setTimeout(function() {this.scene = 8;}, 3000);
});

socket.on("game-cancelled", function() {
    sceneManager.scene = 4;
    console.log("Game was cancelled");
    gameID = "";
    game = {
        points: 0,
        health: 0,
        turn: false,
        winner: null,
        over: false,
        map: 0,
        player2: {health:100,points:5},
        characterType: null,
        player2characterType: null,
    }
    sceneManager.matchmaking = false;
});

socket.on("your-player", function(which) {
    game.whichPlayerAmI = which;
});

socket.on("game-map", function(map) {
    game.map = map;
});

socket.on("other-player", function(player) {
    game.player2.health = player.health;
    game.player2.points = player.points;
});

socket.on("other-player-character", function(type){
    game.player2characterType = type;
});

socket.on("you-win", function(data) {
    game.over = true;
    game.turn = false;
    //game.winner = data.winner;
    game.win = true;

    setTimeout(function(){sceneManager.scene = 8; },3000);
});

socket.on("you-lose", function() {
    game.over = true;
    game.turn = false;
    //game.winner = data.winner;
    game.win = false;

    setTimeout(function(){sceneManager.scene = 8; },3000);
});

function matchmake() {
    socket.emit("matchmake");
    sceneManager.matchmaking = true;
}

function selectPlayer(which) {
    socket.emit("player-selected", {id: gameID, type: which});
    game.characterType = which;
}

function action(which) {
    socket.emit("player-action", {id: gameID, action: which});
}

function resetGame() {
    gameID = "";
    game = {
        points: 0,
        health: 0,
        turn: false,
        winner: null,
        over: false,
        map: 0,
        player2: {health:100,points:5},
        characterType: null,
        player2characterType: null,
        win: null,
    }
    sceneManager.matchmaking = false;
}