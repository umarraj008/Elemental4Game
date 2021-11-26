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

    myData: {
        firstName: null,
        lastName: null,
        DOB: null,
        email: null,
        gamerTag: null,
        gamesWon: null,
        gamesLost: null,
        xpLevel: null,
        perksUnlocked: null,
    },

    loggedIn: false,
}

socket.on("connect", function() {
    console.log("connected to server");
    //socket.emit("join-server");

    let sessionEmail = window.sessionStorage.getItem("email");
    let sessionFirstName = window.sessionStorage.getItem("firstName");
    let sessionLastName = window.sessionStorage.getItem("lastName");
    let sessionGamerTag = window.sessionStorage.getItem("gamerTag");
    let sessionDOB = window.sessionStorage.getItem("DOB");

    if (sessionEmail != null && sessionEmail != undefined && 
        sessionFirstName != null && sessionFirstName != undefined && 
        sessionLastName != null && sessionLastName != undefined && 
        sessionGamerTag != null && sessionGamerTag != undefined && 
        sessionDOB != null && sessionDOB != undefined) {

            let data = {email: sessionEmail, firstName: sessionFirstName, lastName: sessionLastName, gamerTag: sessionGamerTag, DOB: sessionDOB, sessionLoggedIn: true};
            loggedIn(data);
            console.log("Requesting to log back into same account as stored in session storage");
        } else {
            document.getElementById("loginContainer").style.display = "flex";
        }
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
            sceneManager.player1Animator.switchAnimation("attack1", sceneManager.player2Animator);
            break;
        case "attack2":
            sceneManager.player1Animator.switchAnimation("attack2", sceneManager.player2Animator);
            break;
        case "attack3":
            sceneManager.player1Animator.switchAnimation("attack3", sceneManager.player2Animator);
            break;
        case "attack4":
            sceneManager.player1Animator.switchAnimation("ultimate", sceneManager.player2Animator);
            break;
        case "wait":
            sceneManager.player1Animator.switchAnimation("wait");
            break;
        case "heal":
            sceneManager.player1Animator.switchAnimation("heal");
            break;
        case "damage":
            //window.setTimeout(function(){sceneManager.player1Animator.switchAnimation("damage")}, game.hitDelay);
            break;
        case "dead":
            window.setTimeout(function(){sceneManager.player1Animator.switchAnimation("dead")}, 2000);
            break;  
    }

    switch (game.player2.action) {
        case "idle":
            sceneManager.player2Animator.switchAnimation("idle");
            break;
        case "attack1":
            sceneManager.player2Animator.switchAnimation("attack1", sceneManager.player1Animator);
            break;
        case "attack2":
            sceneManager.player2Animator.switchAnimation("attack2", sceneManager.player1Animator);
            break;
        case "attack3":
            sceneManager.player2Animator.switchAnimation("attack3", sceneManager.player1Animator);
            break;
        case "attack4":
            sceneManager.player2Animator.switchAnimation("ultimate", sceneManager.player1Animator);
            break;
        case "wait":
            sceneManager.player2Animator.switchAnimation("wait");
            break;
        case "heal":
            sceneManager.player2Animator.switchAnimation("heal");
            break;
        case "damage":
            //window.setTimeout(function(){sceneManager.player2Animator.switchAnimation("damage")}, game.hitDelay);
            break;
        case "dead":
            window.setTimeout(function(){sceneManager.player2Animator.switchAnimation("dead")}, 2000);
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
    resetGame();
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

    if (type == "earth") {
        sceneManager.player2Animator = new Animator(type, sceneManager.character2X+250, sceneManager.character2Y-270, -(sceneManager.characterWidth*1.4),(sceneManager.characterHeight*1.4));
    } else {
        sceneManager.player2Animator = new Animator(type, sceneManager.character2X, sceneManager.character2Y, -sceneManager.characterWidth,sceneManager.characterHeight);
    }
});

socket.on("you-win", function(data) {
    setTimeout(function(){
        game.over = true;
        game.turn = false;
        //game.winner = data.winner;
        game.win = true;
    },3000);
    setTimeout(function(){sceneManager.scene = 8;},7000); 
});

socket.on("you-lose", function() {
    
    setTimeout(function(){
        game.over = true;
        game.turn = false;
        //game.winner = data.winner;
        game.win = false;
    },3000);

    setTimeout(function(){sceneManager.scene = 8;},7000); 
});

socket.on("logged-in", function(userData) {
    game.myData.firstName = userData.firstName;
    game.myData.lastName = userData.lastName;
    game.myData.DOB = userData.DOB;
    game.myData.email = userData.email;
    game.myData.gamerTag = userData.gamerTag;
    game.myData.gamesWon = userData.gamesWon;
    game.myData.gamesLost = userData.gamesLost;
    game.myData.xpLevel = userData.xpLevel;
    game.myData.perksUnlocked = userData.perksUnlocked;
    game.loggedIn = true;

    sessionStorage.setItem("firstName", userData.firstName);
    sessionStorage.setItem("lastName", userData.lastName);
    sessionStorage.setItem("DOB", userData.DOB);
    sessionStorage.setItem("email", userData.email);
    sessionStorage.setItem("gamerTag", userData.gamerTag);
    sessionStorage.setItem("gamesWon", userData.gamesWon);
    sessionStorage.setItem("gamesLost", userData.gamesLost);
    sessionStorage.setItem("xpLevel", userData.xpLevel);
    sessionStorage.setItem("perksUnlocked", userData.perksUnlocked);

    document.getElementById("loginContainer").parentNode.removeChild(document.getElementById("loginContainer"));
    sceneManager.scene = 0;
    console.log("Logged in as " + game.myData.gamerTag);
});

socket.on("login-failed", function(message) {
    console.log(message);
});

socket.on("register-success", function(data) {
    sessionStorage.setItem("firstName", data.firstName);
    sessionStorage.setItem("lastName", data.lastName);
    sessionStorage.setItem("DOB", data.DOB);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("gamerTag", data.gamerTag);
    sessionStorage.setItem("gamesWon", data.gamesWon);
    sessionStorage.setItem("gamesLost", data.gamesLost);
    sessionStorage.setItem("xpLevel", data.xpLevel);
    sessionStorage.setItem("perksUnlocked", data.perksUnlocked);
    
    location.href = index.html;
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
        whichPlayerAmI: null,
        map: 0,
        player2: {health:100,points:5, turn: false, action: null},
        characterType: null,
        player2characterType: null,
        win: null,
        id: null,
        hitDelay: 700,
    }
    player1Animator = undefined;
    player2Animator = undefined;
    sceneManager.matchmaking = false;
}

function login(e, p) {
    socket.emit("join-server", {email: e, password: p});
}

function loggedIn(data) {
    socket.emit("join-server", data);
}

function logout() {
    sessionStorage.clear();
    game.loggedIn = false;
    location.reload();
}

function register(firstName,lastName,email,DOB,gamerTag,password) {
    let data = {firstName:firstName, lastName:lastName, email:email, DOB:DOB, gamerTag:gamerTag, password:password};
    socket.emit("register", data);
}