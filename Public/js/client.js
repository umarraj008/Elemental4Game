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
    player2: {health:100,points:5, turn: false, action: null, gamerTag: null},
    characterType: null,
    player2characterType: null,
    win: null,
    id: null,
    hitDelay: 700,
    levelUp: false,
    xpGain: 0,

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
        nextLevel: null,
        perkPoints: null,
    },

    loggedIn: false,
}

socket.on("connect", function() {
    console.log("connected to server");
    //socket.emit("join-server");

    if (game.id != null && game.map != 0 && sceneManager.scene != 0) {
        location.reload();
        return;
    }

    let sessionEmail = window.sessionStorage.getItem("email");
    let sessionFirstName = window.sessionStorage.getItem("firstName");
    let sessionLastName = window.sessionStorage.getItem("lastName");
    let sessionGamerTag = window.sessionStorage.getItem("gamerTag");
    let sessionDOB = window.sessionStorage.getItem("DOB");

    if (sessionEmail != null || sessionEmail != undefined && 
        sessionFirstName != null || sessionFirstName != undefined && 
        sessionLastName != null || sessionLastName != undefined && 
        sessionGamerTag != null || sessionGamerTag != undefined && 
        sessionDOB != null || sessionDOB != undefined) {

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
    game.player2.gamerTag = data.p2GT;
    sceneManager.player1HealthBar.changeValue(100);
    sceneManager.player2HealthBar.changeValue(100);
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
        game.health = (data.health <= 0) ? 0 : data.health;
        game.turn = data.turn;
        game.player2.points = data.p2Points;
        game.player2.health = (data.p2Health <= 0) ? 0 : data.p2Health;
        game.player2.turn = data.p2Turn

        if (game.health <= 0 || game.player2.health <= 0) game.turn = false;
    }, game.hitDelay);

    switch (game.action) {
        case "idle":
            sceneManager.player1Animator.switchAnimation("idle");
            break;
        case "attack1":
            sceneManager.player1Animator.switchAnimation("attack1", sceneManager.player2Animator, sceneManager.player2HealthBar, data.p2Health);
            break;
        case "attack2":
            sceneManager.player1Animator.switchAnimation("attack2", sceneManager.player2Animator, sceneManager.player2HealthBar, data.p2Health);
            break;
        case "attack3":
            sceneManager.player1Animator.switchAnimation("attack3", sceneManager.player2Animator, sceneManager.player2HealthBar, data.p2Health);
            break;
        case "attack4":
            sceneManager.player1Animator.switchAnimation("ultimate", sceneManager.player2Animator, sceneManager.player2HealthBar, data.p2Health);
            break;
        case "wait":
            sceneManager.player1Animator.switchAnimation("wait");
            sceneManager.player1HealthBar.changeValue(data.health);
            break;
            case "heal":
            sceneManager.player1HealthBar.changeValue(data.health);
            sceneManager.player1Animator.switchAnimation("heal");
            break;
        case "damage":
            //window.setTimeout(function(){sceneManager.player1Animator.switchAnimation("damage")}, game.hitDelay);
            break;
        case "dead":
            window.setTimeout(function(){sceneManager.player1Animator.switchAnimation("dead"); sceneManager.player2HealthBar.changeValue(data.p2Health);}, 2000);
            break;  
    }

    switch (game.player2.action) {
        case "idle":
            sceneManager.player2Animator.switchAnimation("idle");
            break;
        case "attack1":
            sceneManager.player2Animator.switchAnimation("attack1", sceneManager.player1Animator, sceneManager.player1HealthBar, data.health);
            break;
        case "attack2":
            sceneManager.player2Animator.switchAnimation("attack2", sceneManager.player1Animator, sceneManager.player1HealthBar, data.health);
            break;
        case "attack3":
            sceneManager.player2Animator.switchAnimation("attack3", sceneManager.player1Animator, sceneManager.player1HealthBar, data.health);
            break;
        case "attack4":
            sceneManager.player2Animator.switchAnimation("ultimate", sceneManager.player1Animator, sceneManager.player1HealthBar, data.health);
            break;
        case "wait":
            sceneManager.player2Animator.switchAnimation("wait");
            sceneManager.player2HealthBar.changeValue(data.health);
            break;
        case "heal":
            sceneManager.player2Animator.switchAnimation("heal");
            sceneManager.player2HealthBar.changeValue(data.health);
            break;
        case "damage":
            //window.setTimeout(function(){sceneManager.player2Animator.switchAnimation("damage")}, game.hitDelay);
            break;
        case "dead":
            window.setTimeout(function(){sceneManager.player2Animator.switchAnimation("dead");sceneManager.player1HealthBar.changeValue(data.health);}, 2000);
            break;   
    }

    if (data.turn && sceneManager.bot) sceneManager.botSelected = false;
});

socket.on("game-over", function(data) {
    setTimeout(function(){
        game.over = true;
        game.turn = false;
        game.win = data.winner;
    },3000);

    setTimeout(function(){
        sceneManager.scene = 8;
        game.xpGain = data.xpGain,
        sceneManager.xpHealthBar.maxValue = data.oldNextLevel/100;
        sceneManager.xpHealthBar.value = data.oldXpLevel/100;
        sceneManager.xpHealthBar.changeValue(data.newXpLevel);
        
        if (data.levelUp) {
            setTimeout(function () {
                game.levelUp = true;
                sceneManager.xpHealthBar.maxValue = data.newNextLevel/100;
                sceneManager.xpHealthBar.value = 0;
            }, 3000);
        }

    },7000); 


    game.myData.gamesWon = data.gamesWon;
    game.myData.gamesLost = data.gamesLost;
    game.myData.xpLevel = data.levelUpNewXpLevel;
    game.myData.nextLevel = data.newNextLevel;
    game.myData.perkPoints = data.perkPoints;
    //console.log(data);
});

socket.on("game-cancelled", function() {
    sceneManager.scene = 4;
    resetGame();
});

socket.on("your-player", function(data) {
    game.whichPlayerAmI = data.which;
    game.player2.gamerTag = data.p2GT;
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
    game.myData.perkPoints = userData.perkPoints;
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
    sessionStorage.setItem("perkPoints", userData.perkPoints);

    document.getElementById("loginContainer").parentNode.removeChild(document.getElementById("loginContainer"));
    sceneManager.scene = 0;
    console.log("Logged in as " + game.myData.gamerTag);
});

socket.on("login-failed", function(message) {
    console.log(message);
    logout();
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
    sessionStorage.setItem("perkPoints", data.perkPoints);

    location.href = "index.html";
});

socket.on("perk-buy-success", function(data) {
    game.myData.perkPoints = data.perkPoints;
    game.myData.perksUnlocked = data.perksUnlocked;
    sceneManager.perkConfirmWindow = false;
    updatePerkButtons();
});

socket.on("perk-buy-failed", function() {
    console.log("failed to buy perk");
});

socket.on("update-data", function(data) {
    game.myData.gamesWon = data.gamesWon;
    game.myData.gamesLost = data.gamesLost;
    game.myData.xpLevel = data.xpLevel;
    game.myData.perkPoints = data.perkPoints;
    game.myData.nextLevel = data.nextLevel;

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
        player2: {health:100,points:5, turn: false, action: null, gamerTag: null},
        characterType: null,
        player2characterType: null,
        win: null,
        id: null,
        hitDelay: 700,
        levelUp: false,
        myData: game.myData,
        loggedIn: false,
        xpGain: 0,
    }
    sceneManager.player1Animator = undefined;
    sceneManager.player2Animator = undefined;
    sceneManager.player1HealthBar.value = 0;
    sceneManager.player2HealthBar.value = 0;
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

function buyPerk(perk) {
    if (game.myData.perkPoints >= sceneManager.perkDescription[sceneManager.selectedPerk].price && !sceneManager.perkButtons[perk].bought) {
        socket.emit("buy-perk", perk);
    }
}

function updatePerkButtons() {
    sceneManager.perkButtons.forEach(b => {
        b.bought = false;
    });

    let up = game.myData.perksUnlocked.split(",");
    if (up[0] == 4) {
        sceneManager.perkButtons[0].bought = true;
        sceneManager.perkButtons[1].bought = true;
        sceneManager.perkButtons[2].bought = true;
        sceneManager.perkButtons[3].bought = true;
    } else if (up[0] == 3) {
        sceneManager.perkButtons[0].bought = true;
        sceneManager.perkButtons[1].bought = true;
        sceneManager.perkButtons[2].bought = true;
    } else if (up[0] == 2) {
        sceneManager.perkButtons[0].bought = true;
        sceneManager.perkButtons[1].bought = true;
    } else if (up[0] == 1) {
        sceneManager.perkButtons[0].bought = true;
    }

    if (up[1] == 4) {
        sceneManager.perkButtons[4].bought = true;
        sceneManager.perkButtons[5].bought = true;
        sceneManager.perkButtons[6].bought = true;
        sceneManager.perkButtons[7].bought = true;
    } else if (up[1] == 3) {
        sceneManager.perkButtons[4].bought = true;
        sceneManager.perkButtons[5].bought = true;
        sceneManager.perkButtons[6].bought = true;
    } else if (up[1] == 2) {
        sceneManager.perkButtons[4].bought = true;
        sceneManager.perkButtons[5].bought = true;
    } else if (up[1] == 1) {
        sceneManager.perkButtons[4].bought = true;
    }

    if (up[2] == 4) {
        sceneManager.perkButtons[8].bought = true;
        sceneManager.perkButtons[9].bought = true;
        sceneManager.perkButtons[10].bought = true;
        sceneManager.perkButtons[11].bought = true;
    } else if (up[2] == 3) {
        sceneManager.perkButtons[8].bought = true;
        sceneManager.perkButtons[9].bought = true;
        sceneManager.perkButtons[10].bought = true;
    } else if (up[2] == 2) {
        sceneManager.perkButtons[8].bought = true;
        sceneManager.perkButtons[9].bought = true;
    } else if (up[2] == 1) {
        sceneManager.perkButtons[8].bought = true;
    }

    if (up[3] == 4) {
        sceneManager.perkButtons[12].bought = true;
        sceneManager.perkButtons[13].bought = true;
        sceneManager.perkButtons[14].bought = true;
        sceneManager.perkButtons[15].bought = true;
    } else if (up[3] == 3) {
        sceneManager.perkButtons[12].bought = true;
        sceneManager.perkButtons[13].bought = true;
        sceneManager.perkButtons[14].bought = true;
    } else if (up[3] == 2) {
        sceneManager.perkButtons[12].bought = true;
        sceneManager.perkButtons[13].bought = true;
    } else if (up[3] == 1) {
        sceneManager.perkButtons[12].bought = true;
    }

    for (let i = 0; i < sceneManager.perkDescription.length; i++) {
        if (game.myData.perkPoints >= sceneManager.perkDescription[i].price) {
            sceneManager.perkButtons[i].canBuy = true;
        }
    }
}