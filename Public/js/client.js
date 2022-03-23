// const address = "http://192.168.1.176";
// const port = "3000";
//const socket = io(address + ":" + port, { transports : ['websocket'] });
const socket = io();
//var gameID = "";
var game = {
    ranked: false,
    points: 0,
    health: 0,
    turn: false,
    winner: null,
    over: false,
    whichPlayerAmI: null,
    map: 0,
    player2: {health:100,points:5, turn: false, action: null, gamerTag: null, skillLevel: 0, perkBarValue: 0},
    characterType: null,
    player2characterType: null,
    win: null,
    id: null,
    hitDelay: 700,
    levelUp: false,
    xpGain: 0,
    perkBarValue: 0,
    showPerkActivated: {toggle: false, gamertag: null, perk: null},
    attackButtonsDisabled: false,
    // slGain: 0,
    // skillLevelUp: false,

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
        skillLevel: null,
    },

    loggedIn: false,
    notifValue: 0,
    chatHidden: true,
}
var whatCharacterWasI = null;
var whatMapWasIt = null;
var matchTimer = 0;
var roundIndicator = true;
var skillLevelGain = 0;
var perkCount = 0;

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
            document.getElementById("loginContainer").style.display = "none";
        } else {
            //document.getElementById("loginContainer").style.display = "flex";
        }
});

socket.on("disconnect", function() {
    console.log("disconnected to server");
    sceneManager.errorMessageHandler.makeError(CURRENT_LANGUAGE.errorMessages[0]);
});

socket.on("pick-character", function(data) {
    console.log("pick your character");
    sceneManager.scene = 6;
    game.id = data.gameID;
    game.map = data.map;
    game.player2.gamerTag = data.p2GT;
    sceneManager.player1HealthBar.changeValue(100);
    sceneManager.player2HealthBar.changeValue(100);
    document.getElementById("textChatShow").style.display = "block";
    whatMapWasIt = game.map;
    game.ranked = data.ranked;
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
    if (data.action != null || data.action != undefined) nullroundIndicator = true;
    let p1Damage = game.health - data.health;
    let p2Damage = game.player2.health - data.p2Health;
    game.perkBarValue = data.perkBarValue;
    game.player2.perkBarValue = data.p2PerkBarValue;

    window.setTimeout(function() {
        game.points = data.points;
        game.health = (data.health <= 0) ? 0 : data.health;
        game.turn = data.turn;
        game.player2.points = data.p2Points;
        game.player2.health = (data.p2Health <= 0) ? 0 : data.p2Health;
        game.player2.turn = data.p2Turn
        sceneManager.player1PerkBar.changeValue(game.perkBarValue);
        sceneManager.player2PerkBar.changeValue(game.player2.perkBarValue);
        if (game.health <= 0 || game.player2.health <= 0) game.turn = false;
    }, game.hitDelay);

    switch (game.action) {
        case "idle":
            sceneManager.player1Animator.switchAnimation("idle");
            break;
        case "attack1":
            sceneManager.player1Animator.switchAnimation("attack1", sceneManager.player2Animator, sceneManager.player2HealthBar, data.p2Health, sceneManager.player2PerkBar, data.p2PerkBarValue);
            break;
        case "attack2":
            sceneManager.player1Animator.switchAnimation("attack2", sceneManager.player2Animator, sceneManager.player2HealthBar, data.p2Health, sceneManager.player2PerkBar, data.p2PerkBarValue);
            break;
        case "attack3":
            sceneManager.player1Animator.switchAnimation("attack3", sceneManager.player2Animator, sceneManager.player2HealthBar, data.p2Health, sceneManager.player2PerkBar, data.p2PerkBarValue);
            break;
        case "attack4":
            sceneManager.player1Animator.switchAnimation("ultimate", sceneManager.player2Animator, sceneManager.player2HealthBar, data.p2Health, sceneManager.player2PerkBar, data.p2PerkBarValue);
            break;
        case "wait":
            sceneManager.player1Animator.switchAnimation("wait");
            sceneManager.player1HealthBar.changeValue(data.health);
            sceneManager.player1PerkBar.changeValue(data.perkBarValue);
            sceneManager.indicators.makeIndicator("+2 Points", 500,c.height/2, "rgba(0,255,100,0");
            sceneManager.indicators.makeIndicator("+10 Health", 500,c.height/2+20, "rgba(0,255,100,0");
            break;
            case "heal":
            sceneManager.player1HealthBar.changeValue(data.health);
            sceneManager.player1PerkBar.changeValue(data.perkBarValue);
            sceneManager.player1Animator.switchAnimation("heal");
            sceneManager.indicators.makeIndicator("+30 Health", 500,c.height/2, "rgba(0,255,100,0");
            break;
        case "damage":
            //window.setTimeout(function(){sceneManager.player1Animator.switchAnimation("damage")}, game.hitDelay);
            switch (game.player2.action) {
                case "attack1": setTimeout(function() {sceneManager.indicators.makeIndicator("-" + p1Damage + " Damage", 500,c.height/2, "rgba(255,0,0,0")}, sceneManager.player2Animator.animations.damageTime1); break;
                case "attack2": setTimeout(function() {sceneManager.indicators.makeIndicator("-" + p1Damage + " Damage", 500,c.height/2, "rgba(255,0,0,0")}, sceneManager.player2Animator.animations.damageTime2); break;
                case "attack3": setTimeout(function() {sceneManager.indicators.makeIndicator("-" + p1Damage + " Damage", 500,c.height/2, "rgba(255,0,0,0")}, sceneManager.player2Animator.animations.damageTime3); break;
                case "attack4": setTimeout(function() {sceneManager.indicators.makeIndicator("-" + p1Damage + " Damage", 500,c.height/2, "rgba(255,0,0,0")}, sceneManager.player2Animator.animations.damageTime4); break;
            }
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
            sceneManager.player2Animator.switchAnimation("attack1", sceneManager.player1Animator, sceneManager.player1HealthBar, data.health, sceneManager.player1PerkBar, data.perkBarValue);
            break;
        case "attack2":
            sceneManager.player2Animator.switchAnimation("attack2", sceneManager.player1Animator, sceneManager.player1HealthBar, data.health, sceneManager.player1PerkBar, data.perkBarValue);
            break;
        case "attack3":
            sceneManager.player2Animator.switchAnimation("attack3", sceneManager.player1Animator, sceneManager.player1HealthBar, data.health, sceneManager.player1PerkBar, data.perkBarValue);
            break;
        case "attack4":
            sceneManager.player2Animator.switchAnimation("ultimate", sceneManager.player1Animator, sceneManager.player1HealthBar, data.health, sceneManager.player1PerkBar, data.perkBarValue);
            break;
        case "wait":
            sceneManager.player2Animator.switchAnimation("wait");
            sceneManager.player2HealthBar.changeValue(data.p2Health);
            sceneManager.player2PerkBar.changeValue(data.p2PerkBarValue);
            sceneManager.indicators.makeIndicator("+2 Points", 1500,c.height/2, "rgba(0,255,100,0");
            sceneManager.indicators.makeIndicator("+10 Health", 1500,c.height/2+20, "rgba(0,255,100,0");
            break;
        case "heal":
            sceneManager.player2Animator.switchAnimation("heal");
            sceneManager.player2HealthBar.changeValue(data.p2Health);
            sceneManager.player2PerkBar.changeValue(data.p2PerkBarValue);
            sceneManager.indicators.makeIndicator("+30 Health", 1500,c.height/2, "rgba(0,255,100,0");
            break;
        case "damage":
            switch (game.action) {
                case "attack1": setTimeout(function() {sceneManager.indicators.makeIndicator("-" + p2Damage + " Damage", 1500,c.height/2, "rgba(255,0,0,0")}, sceneManager.player1Animator.animations.damageTime1); break;
                case "attack2": setTimeout(function() {sceneManager.indicators.makeIndicator("-" + p2Damage + " Damage", 1500,c.height/2, "rgba(255,0,0,0")}, sceneManager.player1Animator.animations.damageTime2); break;
                case "attack3": setTimeout(function() {sceneManager.indicators.makeIndicator("-" + p2Damage + " Damage", 1500,c.height/2, "rgba(255,0,0,0")}, sceneManager.player1Animator.animations.damageTime3); break;
                case "attack4": setTimeout(function() {sceneManager.indicators.makeIndicator("-" + p2Damage + " Damage", 1500,c.height/2, "rgba(255,0,0,0")}, sceneManager.player1Animator.animations.damageTime4); break;
            }
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
        game.xpGain = data.xpGain;
        sceneManager.xpHealthBar.maxValue = data.oldNextLevel/100;
        sceneManager.xpHealthBar.value = data.oldXpLevel/100;
        sceneManager.xpHealthBar.changeValue(data.newXpLevel);

        // sceneManager.skillLevelHealthBar.maxValue = Math.floor((data.skillLevel/100)+1);
        sceneManager.skillLevelHealthBar.maxValue = 100;
        sceneManager.skillLevelHealthBar.value = (data.skillLevel/100 - (Math.floor(data.skillLevel/100)))*100;
        
        if (data.levelUp) {
            setTimeout(function () {
                game.levelUp = true;
                sceneManager.xpHealthBar.maxValue = data.newNextLevel/100;
                sceneManager.xpHealthBar.value = data.levelUpNewXpLevel;
                setTimeout(function() {game.levelUp = false}, 3000);
            }, 3000);
        }

    },7000); 

    document.getElementById("textChatShow").style.display = "none";
    game.myData.gamesWon = data.gamesWon;
    game.myData.gamesLost = data.gamesLost;
    game.myData.xpLevel = data.levelUpNewXpLevel;
    game.myData.nextLevel = data.newNextLevel;
    game.myData.perkPoints = data.perkPoints;
    skillLevelGain = (data.skillLevel - game.myData.skillLevel >= 0) ? ("+" + (data.skillLevel - game.myData.skillLevel) + "sr") : ("-" + Math.abs(data.skillLevel - game.myData.skillLevel) + "sr");
    game.myData.skillLevel = data.skillLevel;
    console.log(game.myData.skillLevel);
    document.getElementById("textChat").value = "";
    document.getElementById("textChatInput").value = "";
    hideTextChat();
    document.getElementById("textChatShow").style.display = "none";
    game.id = null;
    //console.log(data);
});

socket.on("game-cancelled", function() {
    sceneManager.scene = 4;
    document.getElementById("textChatShow").style.display = "none";
    resetGame();
});

socket.on("your-player", function(data) {
    game.whichPlayerAmI = data.which;
    game.player2.gamerTag = data.p2GT;
    game.player2.skillLevel = data.p2SL;
    game.player2.nextLevel = data.p2NL;
    game.player2.xpLevel = data.p2XP;
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
    game.myData.skillLevel = userData.skillLevel;
    game.myData.nextLevel = userData.nextLevel;
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
    sessionStorage.setItem("skillLevel", userData.skillLevel);

    document.getElementById("loginContainer").style.display = "none";
    // document.getElementById("loginContainer").parentNode.removeChild(document.getElementById("loginContainer"));
    sceneManager.scene = 0;
    console.log("Logged in as " + game.myData.gamerTag);
    console.log(userData.skillLevel);//////////////////////////////
});

socket.on("login-failed", function(message) {
    sceneManager.errorMessageHandler.makeError(CURRENT_LANGUAGE.errorMessages[message]);
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
    sceneManager.errorMessageHandler.makeError("Failed to Buy Perk.");
    console.log("failed to buy perk");
});

socket.on("update-data", function(data) {
    game.myData.gamesWon = data.gamesWon;
    game.myData.gamesLost = data.gamesLost;
    game.myData.xpLevel = data.xpLevel;
    game.myData.perkPoints = data.perkPoints;
    game.myData.nextLevel = data.nextLevel;
    game.myData.skillLevel = data.skillLevel;
    game.perkBarValue = data.perkBarValue;

});

socket.on("update-chat", function(data){
    let chat= document.getElementById("textChat");
    chat.value += data;
    chat.scrollTop = chat.scrollHeight;

    if(game.chatHidden){
        let notif=document.getElementById("notif");
        game.notifValue ++;
        notif.innerHTML=game.notifValue;
        notif.style.display = "block"
    }

});

socket.on("removed-from-matchmaking", function() {
    sceneManager.matchmaking = false;
})

socket.on("recieve-leaderboard", function(data) {
    if (data.error) {
        sceneManager.errorMessageHandler.makeError(CURRENT_LANGUAGE.errorMessage[data.errorMessage]);
        console.log(data.errorMessage);
    } else {
        // console.table(data.leaderboard1);
        // console.table(data.leaderboard2);
        // console.table(data.leaderboard3);

        sceneManager.leaderboard1 = data.leaderboard1;
        sceneManager.leaderboard2 = data.leaderboard2;
        sceneManager.leaderboard3 = data.leaderboard3;
    }
});

socket.on("perk-activated", function(data) {
    game.showPerkActivated.toggle = true;
    game.showPerkActivated.gamertag = data.gamertag;
    game.showPerkActivated.perk = data.perk;

    if (data.id == socket.id) { //PLAYER 1
        game.perkBarValue = 0;
        sceneManager.player1PerkBar.changeValue(0); 
        
        if (data.pointChange) { // point boost
            game.points = data.points;
        }

        if (data.healthChange) { //Max health
            game.health = data.health;
            sceneManager.player1HealthBar.changeValue(game.health)
        }
    } else { // PLAYER 2
        game.player2.perkBarValue = 0;
        sceneManager.player2PerkBar.changeValue(0); 

        if (data.pointChange) {
            game.player2.points = data.points;
        }

        if (data.healthChange) { // point boost
            game.player2.health = data.health;
            sceneManager.player2HealthBar.changeValue(game.player2.health)
        }

        if (data.perk == "Just Wait") {  //Max health
            game.attackButtonsDisabled = true;
        }
    }

    setTimeout(function() {game.showPerkActivated.toggle = false}, 4000);
});

socket.on("recieve-profile", function(data) {
    if (data.error) {
        sceneManager.errorMessageHandler.makeError(data.errorMessage);
        console.log(CURRENT_LANGUAGE.errorMessages[data.errorMessage]);
    } else {
        sceneManager.profilePlayer = data.player;
        sceneManager.camera.transitionTo(13,0.005);
        profileSearchBar(false, 50);
        document.getElementById("profileSearchBar").value = "";
    }
});

socket.on("just-wait-over", function() {
    game.attackButtonsDisabled = false;
    console.log("test");
});

function matchmake(ranked) {
    if (ranked) socket.emit("ranked-matchmake");
    if (!ranked) socket.emit("matchmake");
    sceneManager.matchmaking = true;
}

function stopMatchmaking() {
    socket.emit("stop-matchmaking");
}

function selectPlayer(which) {
    whatCharacterWasI = which;
    socket.emit("player-selected", {id: game.id, type: which});
    game.characterType = which;
}

function action(which) {
    let actions = [0,6,3,4,5,15,0];
    // if (!(which == 6 && game.perkBarValue >= 100)) {
    //     return;
    // }

    if (game.points >= actions[which]) {
        socket.emit("player-action", {id: game.id, action: which});
        game.turn = false;
    }
}

function resetGame() {
    setTimeout(function() {

        gameID = "";
        game = {
            ranked: false,
            points: 0,
            health: 0,
            turn: false,
            winner: null,
            over: false,
            whichPlayerAmI: null,
            map: 0,
            player2: {health:100,points:5, turn: false, action: null, gamerTag: null, skillLevel: 0, perkBarValue: 0},
            characterType: null,
            player2characterType: null,
            win: null,
            id: null,
            hitDelay: 700,
            levelUp: false,
            myData: game.myData,
            loggedIn: false,
            xpGain: 0,
            perkBarValue: 0,
            showPerkActivated: {toggle: false, gamertag: null, perk: null},
            attackButtonsDisabled: false,
            // slGain: 0,
            // skillLevelUp: false,
        }
        sceneManager.player1Animator = undefined;
        sceneManager.player2Animator = undefined;
        sceneManager.player1HealthBar.value = 0;
        sceneManager.player2HealthBar.value = 0;
        game.notifValue = 0;
        matchTimer = 0;
        roundIndicator = true;
    },1000);
    
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

function usePerk() {
    socket.emit("use-perk", game.id);
}

function buyPerk(perk) {
    if (game.myData.perkPoints >= sceneManager.perkDescription[sceneManager.selectedPerk].price && !sceneManager.perkButtons[perk].bought) {
        socket.emit("buy-perk", perk);
    }
}

function activatePerk(perk) {
    let up = game.myData.perksUnlocked.split(",");
    if (up[perk] == 1) {
        console.log(up);
        for (i = 0; i < up.length; i++) {
            if (up[i] == 2) { up[i] = '1'; break; }
        }
        console.log(up);
        up[perk] = 2;
        game.myData.perksUnlocked = up[0]+","+up[1]+","+up[2]+","+up[3]+","+up[4]+","+up[5]+","+up[6]+","+up[7]+","+up[8];
        socket.emit("activate-perk", perk);
        updatePerkButtons();
    };
}

function updatePerkButtons() {
    sceneManager.perkButtons.forEach(b => {
        b.bought = false;
    });

    let up = game.myData.perksUnlocked.split(",");

    perkCount = 0;
    for (i = 0; i < up.length; i++) {
        if (up[i] != '0' ) {
            perkCount++;
        }
    }

    //makes all buttons disabled for reset
    for (let i = 0; i < sceneManager.perkDescription.length; i++) {
        // if (game.myData.perkPoints >= sceneManager.perkDescription[i].price) {
            // sceneManager.perkButtons[i].style = "normal";
        // } else {
            sceneManager.perkButtons[i].style = "disabled";
            sceneManager.perkActivateButton.style = "disabled";
        // }
        
        if (up[i] == 1) sceneManager.perkButtons[i].style = "normal";
        if (up[i] == 2) sceneManager.perkButtons[i].style = "bought";
    }

    if (up[sceneManager.selectedPerk] == 1) {
        sceneManager.perkActivateButton.style = "normal";
    }

    if (game.myData.perkPoints >= sceneManager.perkDescription[sceneManager.selectedPerk].price && up[sceneManager.selectedPerk] == 0) {
        sceneManager.perkBuyButton.style = "normal";
    } else {
        sceneManager.perkBuyButton.style = "disabled";
    }
}

function showTextChat(){
    document.getElementById("textChatContainer").style.display = "block";
    document.getElementById("textChatHide").style.display = "block";
    document.getElementById("textChatShow").style.display = "none";
    document.getElementById("notif").style.display = "none";

    game.notifValue = 0;
    game.chatHidden = false;
}

function hideTextChat(){
    document.getElementById("textChatContainer").style.display = "none";
    document.getElementById("textChatHide").style.display = "none";
    document.getElementById("textChatShow").style.display = "block";

    game.chatHidden = true;
}

function sendMessageTextChat(){
    let textinput = document.getElementById("textChatInput");
    let message = textinput.value;

    if (message.length < 1){
        return;
    }

    if (game.id != null) {   
        let data = {id:game.id, message: game.myData.gamerTag + ": " + message + "\n"}
        socket.emit("send-text-chat", data);
        textinput.value = ""; 
    }
}

function loadSettings() {
    console.log(SETTINGS);
    //frame rate
    if (SETTINGS.frameRate == 30) {
        sceneManager.settingsButtons.frameRate30FPS.style = "selected";
        sceneManager.settingsButtons.frameRate60FPS.style = "disabled";
    } else if (SETTINGS.frameRate == 60) {
        sceneManager.settingsButtons.frameRate30FPS.style = "disabled";
        sceneManager.settingsButtons.frameRate60FPS.style = "selected";
    }

    //wind particles
    if (SETTINGS.windParticles == true) {
        sceneManager.settingsButtons.windParticlesOn.style = "selected";
        sceneManager.settingsButtons.windParticlesOff.style = "disabled";
    } else {
        sceneManager.settingsButtons.windParticlesOn.style = "disabled";
        sceneManager.settingsButtons.windParticlesOff.style = "selected";
    }

    //debris
    if (SETTINGS.debrisParticles == true) {
        sceneManager.settingsButtons.debrisParticlesOn.style = "selected";
        sceneManager.settingsButtons.debrisParticlesOff.style = "disabled";
    } else {
        sceneManager.settingsButtons.debrisParticlesOn.style = "disabled";
        sceneManager.settingsButtons.debrisParticlesOff.style = "selected";
    }
    
    //moving background
    if (SETTINGS.movingBackground == true) {
        sceneManager.settingsButtons.movingBackgroundOn.style = "selected";
        sceneManager.settingsButtons.movingBackgroundOff.style = "disabled";
    } else {
        sceneManager.settingsButtons.movingBackgroundOn.style = "disabled";
        sceneManager.settingsButtons.movingBackgroundOff.style = "selected";
    }
    
    //text indicators
    if (SETTINGS.textIndicators == true) {
        sceneManager.settingsButtons.textIndicatorsOn.style = "selected";
        sceneManager.settingsButtons.textIndicatorsOff.style = "disabled";
    } else {
        sceneManager.settingsButtons.textIndicatorsOn.style = "disabled";
        sceneManager.settingsButtons.textIndicatorsOff.style = "selected";
    }
    
    //fullscreen
    if (SETTINGS.fullscreen == true) {
        sceneManager.settingsButtons.fullscreenOn.style = "selected";
        sceneManager.settingsButtons.fullscreenOff.style = "disabled";
    } else {
        sceneManager.settingsButtons.fullscreenOn.style = "disabled";
        sceneManager.settingsButtons.fullscreenOff.style = "selected";
    }
}

function loadAccessFeatures() {
    //color blindness
    if (SETTINGS.colorBlindness == 0) {
        sceneManager.accessPageColorBlindnessNoneButton.style = "selected";
        sceneManager.accessPageColorBlindness1Button.style = "disabled";
        sceneManager.accessPageColorBlindness2Button.style = "disabled";
        sceneManager.accessPageColorBlindness3Button.style = "disabled";
    } else if (SETTINGS.colorBlindness == 1) {
        sceneManager.accessPageColorBlindnessNoneButton.style = "disabled";
        sceneManager.accessPageColorBlindness1Button.style = "selected";
        sceneManager.accessPageColorBlindness2Button.style = "disabled";
        sceneManager.accessPageColorBlindness3Button.style = "disabled";
    } else if (SETTINGS.colorBlindness == 2) {
        sceneManager.accessPageColorBlindnessNoneButton.style = "disabled";
        sceneManager.accessPageColorBlindness1Button.style = "disabled";
        sceneManager.accessPageColorBlindness2Button.style = "selected";
        sceneManager.accessPageColorBlindness3Button.style = "disabled";
    } else if (SETTINGS.colorBlindness == 3) {
        sceneManager.accessPageColorBlindnessNoneButton.style = "disabled";
        sceneManager.accessPageColorBlindness1Button.style = "disabled";
        sceneManager.accessPageColorBlindness2Button.style = "disabled";
        sceneManager.accessPageColorBlindness3Button.style = "selected";
    }

    //language
    if (SETTINGS.language == 0) {
        sceneManager.accessPageLanguage1.style = "selected";
        sceneManager.accessPageLanguage2.style = "disabled";
        sceneManager.accessPageLanguage3.style = "disabled";
        sceneManager.accessPageLanguage4.style = "disabled";
        sceneManager.accessPageLanguage5.style = "disabled";
        sceneManager.accessPageLanguage6.style = "disabled";
        loadLanguage(0);
    } else if (SETTINGS.language == 1) {
        sceneManager.accessPageLanguage1.style = "disabled";
        sceneManager.accessPageLanguage2.style = "selected";
        sceneManager.accessPageLanguage3.style = "disabled";
        sceneManager.accessPageLanguage4.style = "disabled";
        sceneManager.accessPageLanguage5.style = "disabled";
        sceneManager.accessPageLanguage6.style = "disabled";
        loadLanguage(1);
    } else if (SETTINGS.language == 2) {
        sceneManager.accessPageLanguage1.style = "disabled";
        sceneManager.accessPageLanguage2.style = "disabled";
        sceneManager.accessPageLanguage3.style = "selected";
        sceneManager.accessPageLanguage4.style = "disabled";
        sceneManager.accessPageLanguage5.style = "disabled";
        sceneManager.accessPageLanguage6.style = "disabled";
        loadLanguage(2);
    } else if (SETTINGS.language == 3) {
        sceneManager.accessPageLanguage1.style = "disabled";
        sceneManager.accessPageLanguage2.style = "disabled";
        sceneManager.accessPageLanguage3.style = "disabled";
        sceneManager.accessPageLanguage4.style = "selected";
        sceneManager.accessPageLanguage5.style = "disabled";
        sceneManager.accessPageLanguage6.style = "disabled";
        loadLanguage(3);
    } else if (SETTINGS.language == 4) {
        sceneManager.accessPageLanguage1.style = "disabled";
        sceneManager.accessPageLanguage2.style = "disabled";
        sceneManager.accessPageLanguage3.style = "disabled";
        sceneManager.accessPageLanguage4.style = "disabled";
        sceneManager.accessPageLanguage5.style = "selected";
        sceneManager.accessPageLanguage6.style = "disabled";
        loadLanguage(4);
    } else if (SETTINGS.language == 5) {
        sceneManager.accessPageLanguage1.style = "disabled";
        sceneManager.accessPageLanguage2.style = "disabled";
        sceneManager.accessPageLanguage3.style = "disabled";
        sceneManager.accessPageLanguage4.style = "disabled";
        sceneManager.accessPageLanguage5.style = "disabled";
        sceneManager.accessPageLanguage6.style = "selected";
        loadLanguage(5);
    }
}

function loadLanguage(which) {
    switch(which) {
        case 0: CURRENT_LANGUAGE = LANGUAGE.english; break;
        case 1: CURRENT_LANGUAGE = LANGUAGE.spanish; break;
        case 2: CURRENT_LANGUAGE = LANGUAGE.french; break;
        case 3: CURRENT_LANGUAGE = LANGUAGE.italian; break;
        case 4: CURRENT_LANGUAGE = LANGUAGE.chinese; break;
        case 5: CURRENT_LANGUAGE = LANGUAGE.japanese; break;
    }

    sceneManager.updateAllText();
}

function requestLeaderboard() {
    socket.emit("request-leaderboard");
}

function profileSearchBar(on, val) {
    console.log(on)
    if (on) {
        setTimeout(function() {document.getElementById("profileSearchBarContainer").style.display = "flex"}, val);
    } else {
        setTimeout(function() {document.getElementById("profileSearchBarContainer").style.display = "none"}, val);
    }
}

function searchForPlayer() {
    let gamertag = document.getElementById("profileSearchBar").value;
    console.log("searching for player: " + gamertag);
    if (gamertag.length <= 0) { document.getElementById("profileSearchBar").value = ""; return };
    if (gamertag.length >= 15) { document.getElementById("profileSearchBar").value = ""; return };
    socket.emit("request-profile", gamertag);
}