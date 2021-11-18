// const address = "http://192.168.1.176";
// const port = "3000";
//const socket = io(address + ":" + port, { transports : ['websocket'] });
const socket = io();
//var gameID = "";
var game = {
    points: 0,
    health: 0,
    turn: false,
    winner: null,
    over: false,
    whichPlayerAmI: null,
    map: 0,
    player2: {health:100,points:5, turn: false, action: null},
    characterType: null,
    player2characterType: null,
    win: null,
    id: null,
    hitDelay: 700,
}

socket.on("connect", function() {
    console.log("connected to server");
    socket.emit("join-server");
});

socket.on("disconnect", function() {
    console.log("disconnected to server");
});

socket.on("pick-character", function(data) {
    console.log("pick your character");
    sceneManager.scene = 6;
    game.id = data.gameID;
    game.map = data.map;

});

socket.on("player2-turn", function() {
    console.log("player2 turn")
});


socket.on("player1-turn", function() {
    console.log("player1 turn")
});

socket.on("game-update", function(data) {
    game.action = data.action;
    game.player2.action = data.p2Action;

    window.setTimeout(function() {
        game.points = data.points;
        game.health = data.health;
        game.turn = data.turn;
        game.player2.points = data.p2Points;
        game.player2.health = data.p2Health;
        game.player2.turn = data.p2Turn
    }, game.hitDelay);

    switch (game.action) {
        case "idle":
            sceneManager.player1Animator.switchAnimation("idle");
            break;
        case "attack1":
            sceneManager.player1Animator.switchAnimation("attack");
            break;
        case "attack2":
            sceneManager.player1Animator.switchAnimation("attack");
            break;
        case "attack3":
            sceneManager.player1Animator.switchAnimation("attack");
            break;
        case "attack4":
            sceneManager.player1Animator.switchAnimation("ultimate");
            break;
        case "wait":
            sceneManager.player1Animator.switchAnimation("wait");
            break;
        case "heal":
            sceneManager.player1Animator.switchAnimation("heal");
            break;
        case "damage":
            window.setTimeout(function(){sceneManager.player1Animator.switchAnimation("damage")}, game.hitDelay);
            break;
        case "dead":
            window.setTimeout(function(){sceneManager.player1Animator.switchAnimation("dead")}, game.hitDelay);
            break;  
    }

    switch (game.player2.action) {
        case "idle":
            sceneManager.player2Animator.switchAnimation("idle");
            break;
        case "attack1":
            sceneManager.player2Animator.switchAnimation("attack");
            break;
        case "attack2":
            sceneManager.player2Animator.switchAnimation("attack");
            break;
        case "attack3":
            sceneManager.player2Animator.switchAnimation("attack");
            break;
        case "attack4":
            sceneManager.player2Animator.switchAnimation("ultimate");
            break;
        case "wait":
            sceneManager.player2Animator.switchAnimation("wait");
            break;
        case "heal":
            sceneManager.player2Animator.switchAnimation("heal");
            break;
        case "damage":
            window.setTimeout(function(){sceneManager.player2Animator.switchAnimation("damage")}, game.hitDelay);
            break;
        case "dead":
            window.setTimeout(function(){sceneManager.player2Animator.switchAnimation("dead")}, game.hitDelay);
            break;   
    }

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

// socket.on("game-map", function(map) {
//     game.map = map;
// });

// socket.on("other-player", function(player) {
//     game.player2.health = player.health;
//     game.player2.points = player.points;
// });

socket.on("other-player-character", function(type){
    game.player2characterType = type;
    if (type == 0 ) {
        type = "fire";
    } else if (type == 1) {
        type = "water";
    } else if (type == 2) {
        type = "earth";
    } else if (type == 3) {
        type = "air";
    }  
    sceneManager.player2Animator = new Animator(type, -1100, -60,-sceneManager.characterWidth,sceneManager.characterHeight);
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
    socket.emit("player-selected", {id: game.id, type: which});
    game.characterType = which;
}

function action(which) {
    let actions = [0,6,3,4,5,15];
    if (game.points >= actions[which]) {
        socket.emit("player-action", {id: game.id, action: which});
        game.turn = false;
    }
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