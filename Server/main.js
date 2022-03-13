//Constant variables for server
const User = require("./User");
const Game = require("./Game");
const events = require("events");
const em = new events.EventEmitter();
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
var rankedMatchmakingQueue = [];
var games = {};
//var rooms = io.sockets.adapter.rooms;

//database setup
var db = mysql.createPool({
    host: "eu-cdbr-west-01.cleardb.com",
    database: "heroku_d85e5cf42d32717",
    user: "b0e016254a55c2",
    password: "5ccaf3af",
});

//check database connection
// db.connect(e => {
//     if (e) { console.log("Error connecting to database"); setTimeout(function() {handleDisconnect()}, 2000);} else { console.log("Connected to database"); }
// });

db.query("SELECT 1", (error, results, fields) => {
    if (error) throw error
    console.log("Connected to Database"); 
});

//db error
db.on("error", error => {
    console.log("Disconnected From Database");
    if (error.code == "PROTOCOL_CONNECTION_LOST") {
        db = mysql.createConnection({
            host: "eu-cdbr-west-01.cleardb.com",
            database: "heroku_d85e5cf42d32717",
            user: "b0e016254a55c2",
            password: "5ccaf3af",
        });
    } else {
        throw error;
    }
});

io.sockets.on("connection", function(socket) {
    //console.log("Player has connected to the server");
    
    socket.on("join-server", function(data) {
        //check if account is already active on server
        let check = true;
        for (let [k, v] of players.entries()) {
            if (v.email == data.email) {
                check = false;
                break;
            }
        }

        if (check) {
            if (data.sessionLoggedIn) {
                db.query("SELECT * FROM users WHERE email='"+data.email+"' AND firstName='"+data.firstName+"' AND lastName='"+data.lastName+"' AND dob='"+data.DOB+"' AND gamertag='"+data.gamerTag+"'", function(error, result) {
                    if (!error) {
                        if (result.length == 1) {
                            //make player
                            let userData = {
                                id: result[0].playerID,
                                firstName: result[0].firstName,
                                lastName: result[0].lastName,
                                DOB: result[0].dob,
                                email: result[0].email,
                                gamerTag: result[0].gamertag,
                                gamesWon: result[0].gamesWon,
                                gamesLost: result[0].gamesLost,
                                xpLevel: result[0].xpLevel,
                                perksUnlocked: result[0].perksUnlocked,
                                nextLevel: result[0].nextLevel,
                                perkPoints: result[0].perkPoints,
                                skillLevel: result[0].skillLevel,
                            }

                            let player = new User(socket, userData);
                            players.set(socket.id, player);
                            socket.emit("logged-in", userData);
                        } else {
                            //2 users found with same email?
                            socket.emit("login-failed", "Login Failed");
                        }
                    } else {
                        //database error
                        socket.emit("login-failed", "Email or Password is Incorrect");
                    }
                });
            } else {
                db.query("SELECT * FROM users WHERE email='"+data.email+"'", function(error, result) {
                    if (!error) {
                        if (result.length == 1) {
                            if (result[0].password == data.password) {

                                //make player
                                let userData = {
                                    id: result[0].playerID,
                                    firstName: result[0].firstName,
                                    lastName: result[0].lastName,
                                    DOB: result[0].dob,
                                    email: result[0].email,
                                    gamerTag: result[0].gamertag,
                                    gamesWon: result[0].gamesWon,
                                    gamesLost: result[0].gamesLost,
                                    xpLevel: result[0].xpLevel,
                                    perksUnlocked: result[0].perksUnlocked,
                                    nextLevel: result[0].nextLevel,
                                    perkPoints: result[0].perkPoints,
                                    skillLevel: result[0].skillLevel,
                                }
                                
                                let player = new User(socket, userData);
                                players.set(socket.id, player);
                                socket.emit("logged-in", userData);
                            } else {
                                //wrong password
                                socket.emit("login-failed", "Email or Password is Incorrect");
                            }
                        } else {
                            //2 users found with same email?
                            socket.emit("login-failed", "Login Failed");
                        }
                    } else {
                        //database error
                        socket.emit("login-failed", "Email or Password is Incorrect");
                    }
                });
            }
        } else {
            socket.emit("login-failed", "User has already logged in somewhere else");
        }
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
            
            if (matchmakingQueue[1].socket == undefined) {
                matchmakingQueue.splice(1,1);
            }

            if (matchmakingQueue[0].socket == undefined) {
                matchmakingQueue.splice(0,1);
            }

            //make new game
            let player1 = {
                socket: matchmakingQueue[0].socket,
                id: matchmakingQueue[0].id,
                gamerTag: matchmakingQueue[0].gamerTag,
                gamesWon: matchmakingQueue[0].gamesWon,
                gamesLost: matchmakingQueue[0].gamesLost,
                xpLevel: matchmakingQueue[0].xpLevel,
                perksUnlocked: matchmakingQueue[0].perksUnlocked,
                nextLevel: matchmakingQueue[0].nextLevel,
                perkPoints: matchmakingQueue[0].perkPoints,
                skillLevel: matchmakingQueue[0].skillLevel,
            };

            let player2 = {
                socket: matchmakingQueue[1].socket,
                id: matchmakingQueue[1].id,
                gamerTag: matchmakingQueue[1].gamerTag,
                gamesWon: matchmakingQueue[1].gamesWon,
                gamesLost: matchmakingQueue[1].gamesLost,
                xpLevel: matchmakingQueue[1].xpLevel,
                perksUnlocked: matchmakingQueue[1].perksUnlocked,
                nextLevel: matchmakingQueue[1].nextLevel,
                perkPoints: matchmakingQueue[1].perkPoints,
                skillLevel: matchmakingQueue[1].skillLevel,
            };

            var game = new Game(gameID, em, player1, player2, false);
            findPlayer(matchmakingQueue[0].socket.id).gameID = gameID;
            findPlayer(matchmakingQueue[1].socket.id).gameID = gameID;
            
            //remove players from matchmaking queue
            matchmakingQueue.splice(0,2);

            //set game
            games[gameID] = game;
            games[gameID].startGame();
        }
    });

    socket.on("ranked-matchmake", function() {
        let player = findPlayer(socket.id);
        rankedMatchmakingQueue.push(player);

        if (rankedMatchmakingQueue.length >= 2) {

            //make game id
            let gameID = makeGameID();

            //make players join room
            //rankedMatchmakingQueue[0].socket.join(gameID);
            //rankedMatchmakingQueue[1].socket.join(gameID);
            
            if (rankedMatchmakingQueue[1].socket == undefined) {
                rankedMatchmakingQueue.splice(1,1);
            }

            if (rankedMatchmakingQueue[0].socket == undefined) {
                rankedMatchmakingQueue.splice(0,1);
            }

            //make new game
            let player1 = {
                socket: rankedMatchmakingQueue[0].socket,
                id: rankedMatchmakingQueue[0].id,
                gamerTag: rankedMatchmakingQueue[0].gamerTag,
                gamesWon: rankedMatchmakingQueue[0].gamesWon,
                gamesLost: rankedMatchmakingQueue[0].gamesLost,
                xpLevel: rankedMatchmakingQueue[0].xpLevel,
                perksUnlocked: rankedMatchmakingQueue[0].perksUnlocked,
                nextLevel: rankedMatchmakingQueue[0].nextLevel,
                perkPoints: rankedMatchmakingQueue[0].perkPoints,
                skillLevel: rankedMatchmakingQueue[0].skillLevel,
            };
            console.log(rankedMatchmakingQueue[0].skillLevel, rankedMatchmakingQueue[1].skillLevel);////////////////////////////

            let player2 = {
                socket: rankedMatchmakingQueue[1].socket,
                id: rankedMatchmakingQueue[1].id,
                gamerTag: rankedMatchmakingQueue[1].gamerTag,
                gamesWon: rankedMatchmakingQueue[1].gamesWon,
                gamesLost: rankedMatchmakingQueue[1].gamesLost,
                xpLevel: rankedMatchmakingQueue[1].xpLevel,
                perksUnlocked: rankedMatchmakingQueue[1].perksUnlocked,
                nextLevel: rankedMatchmakingQueue[1].nextLevel,
                perkPoints: rankedMatchmakingQueue[1].perkPoints,
                skillLevel: rankedMatchmakingQueue[1].skillLevel,
            };

            var game = new Game(gameID, em, player1, player2, true);
            findPlayer(rankedMatchmakingQueue[0].socket.id).gameID = gameID;
            findPlayer(rankedMatchmakingQueue[1].socket.id).gameID = gameID;
            
            //remove players from matchmaking queue
            rankedMatchmakingQueue.splice(0,2);

            //set game
            games[gameID] = game;
            games[gameID].startGame();
        }
    });

    socket.on("stop-matchmaking", function () {
        let player = findPlayer(socket.id);
        
        //quick matchmaking queue
        for (let i = 0; i < matchmakingQueue.length; i++) {
            if (matchmakingQueue[i].socket.id == socket.id) {
                matchmakingQueue.splice(i, 1);
                socket.emit("removed-from-matchmaking");
                return;
            }
        }

        //ranked matchmaking queue
        for (let i = 0; i < rankedMatchmakingQueue.length; i++) {
            if (rankedMatchmakingQueue[i].socket.id == socket.id) {
                rankedMatchmakingQueue.splice(i, 1);
                socket.emit("removed-from-matchmaking");
                return;
            }
        }
    })

    socket.on("disconnect", function() {
        let player = findPlayer(socket.id);

        if (player == null || player == undefined) {
            return;
        }

        //if player is in matchmaking queue
        for (i = 0; i < matchmakingQueue.length; i++) {
            if (matchmakingQueue[i].socket.id == socket.id) {
                matchmakingQueue.splice(i, 1);
                break;
            }
        }

        //if player is in ranked matchmaking queue
        for (i = 0; i < rankedMatchmakingQueue.length; i++) {
            if (rankedMatchmakingQueue[i].socket.id == socket.id) {
                rankedMatchmakingQueue.splice(i, 1);
                break;
            }
        }

        //if player was in a game then end match
        if (games[player.gameID] != null || games[player.gameID] != undefined) {
            games[player.gameID].matchCancelled(socket.id);
            delete games[player.gameID];
            console.log("match cancelled, game deleted: " + player.gameID);
        }

        //delete player from list
        players.delete(socket.id);
    });

    socket.on("player-selected", function(data) {
        games[data.id].playerSelected(socket.id, data.type);
    });

    socket.on("player-action", function(data) {
        games[data.id].playerAction(data.action);
    });

    socket.on("register", function(data) {
        db.query("SELECT * FROM users WHERE email='"+data.email+"'",function(error, result) {
            if (!error) {
                if(result.length >= 1) {
                    socket.emit("register-failed", "Account with the same email already exists");
                    return;
                }
            } else {
                socket.emit("register-failed", "Register failed");
                return;
            }
        });
        db.query("SELECT * FROM users WHERE gamertag='"+data.gamerTag+"'",function(error, result) {
            if (!error) {
                if(result.length >= 1) {
                    socket.emit("register-failed", "Account with the same gamertag already exists");
                    return;
                }
            } else {
                socket.emit("register-failed", "Register failed");
                return;
            }
        });
        db.query("INSERT INTO users(firstName, lastName, dob, email, password, gamertag, gamesWon, gamesLost, xpLevel, perksUnlocked, nextLevel, skillLevel) VALUES('"+data.firstName+"','"+data.lastName+"','"+data.DOB+"', '"+data.email+"', '"+data.password+"', '"+data.gamerTag+"', '0','0','0','0,0,0,0','1000','0')",function(error, result) {
            if (error) {
                socket.emit("register-failed", "Register failed");
                return;
            }
        });
        db.query("SELECT * FROM users WHERE email='"+data.email+"'",function(error, result) {
            if (!error) {
                if(result.length == 1) {
                    let data = {
                        firstName: result[0].firstName,
                        lastName: result[0].lastName,
                        DOB: result[0].dob,
                        email: result[0].email,
                        gamerTag: result[0].gamertag,
                        gamesWon: result[0].gamesWon,
                        gamesLost: result[0].gamesLost,
                        xpLevel: result[0].xpLevel,
                        perksUnlocked: result[0].perksUnlocked,
                        nextLevel: result[0].nextLevel,
                        skillLevel: result[0].skillLevel,
                    }
                    socket.emit("register-success", data);
                    return;
                } 
            } else {
                socket.emit("register-failed", "Register failed");
                return;
            }
        });
    });

    socket.on("buy-perk", function (data) {
       let perkPrices = [
           5,  5,  5,
           10, 10, 10,
           20, 20, 20,
       ]; 

       let player = findPlayer(socket.id);
       
        if (player.perkPoints >= perkPrices[data]) {  

            let newPerksUnlocked = player.perksUnlocked.split(",");
            // let perk = data % 4;
            // if (data <= 3) {
            //     newPerksUnlocked[0] = perk+1;
            // } else if (data >= 4 && data <= 7) {
            //     newPerksUnlocked[1] = perk+1;
            // } else if (data >= 8 && data <= 11) {
            //     newPerksUnlocked[2] = perk+1;
            // }else if (data >= 12 && data <= 15) {
            //     newPerksUnlocked[3] = perk+1;
            // }

            newPerksUnlocked[data] = '1';
            newPerksUnlocked = newPerksUnlocked[0]+","+newPerksUnlocked[1]+","+newPerksUnlocked[2]+","+newPerksUnlocked[3]+","+newPerksUnlocked[4]+","+newPerksUnlocked[5]+","+newPerksUnlocked[6]+","+newPerksUnlocked[7]+","+newPerksUnlocked[8];
            player.perkPoints -= perkPrices[data];

            //update account
           db.query("UPDATE users SET perksUnlocked='"+newPerksUnlocked+"',perkPoints='"+player.perkPoints+"' WHERE playerID='"+player.id+"'", function(error, result) {
                if (!error) {
                    player.perksUnlocked = newPerksUnlocked;
                    let updateData = {
                        perkPoints: player.perkPoints,
                        perksUnlocked: player.perksUnlocked,
                    }
                    socket.emit("perk-buy-success", updateData);
                } else {
                    socket.emit("perk-buy-failed");
                }
            });
        } else {
            socket.emit("perk-buy-failed");
        }

    });

    socket.on("activate-perk", function(data) {
        let player = findPlayer(socket.id);
        let perksUnlocked = player.perksUnlocked.split(",");

        if (perksUnlocked[data] == '1') {
            for (i = 0; i < perksUnlocked.length; i++) {
                if (perksUnlocked[i] == '2') perksUnlocked[i] = '1';
            }

            perksUnlocked[data] = '2';
            perksUnlocked = perksUnlocked[0]+","+perksUnlocked[1]+","+perksUnlocked[2]+","+perksUnlocked[3]+","+perksUnlocked[4]+","+perksUnlocked[5]+","+perksUnlocked[6]+","+perksUnlocked[7]+","+perksUnlocked[8];
            
            db.query("UPDATE users SET perksUnlocked='"+perksUnlocked+"',perkPoints='"+player.perkPoints+"' WHERE playerID='"+player.id+"'", function(error, result) {
                if (!error) {
                    player.perksUnlocked = perksUnlocked;
                    let updateData = {
                        perkPoints: player.perkPoints,
                        perksUnlocked: player.perksUnlocked,
                    }
                    socket.emit("perk-buy-success", updateData);
                } else {
                    socket.emit("perk-buy-failed");
                }
            });
        }
    });

    socket.on("send-text-chat",function(data){
        games[data.id].sendTextChatMessage(data.message);
    });

    socket.on("request-leaderboard", function() {
        db.query("SELECT * FROM users ORDER BY gamesWon ASC", function(error, results) {
            if (error) {
                socket.emit("recieve-leaderboard", {error: true, errorMessage: "Failed to get leaderboard data."});
                return;
            } else {
                if (results.length > 0) {
                    // let rawLeaderboard1 = results.sort(compareByWins);
                    // let rawLeaderboard2 = results.sort(compareBySkillLevel); 
                    // let rawLeaderboard3 = results.sort(compareByXP); 
                    // console.table(results);
                    // console.log("//////////////////////////////");
                    let rawLeaderboard1 = [];
                    results.forEach(element => {rawLeaderboard1.unshift(element)});

                    let rawLeaderboard2 = results.sort((b,a) => {return a.skillLevel - b.skillLevel;}); //////THIS IS BROKEN
                    let rawLeaderboard3 = results.sort((b,a) => {return (a.nextLevel-1000 + a.xpLevel) - (b.nextLevel-1000 + b.xpLevel);}); 
                    
                    let leaderboard1 = [];
                    let leaderboard2 = [];
                    let leaderboard3 = [];
                    
                    // console.table(rawLeaderboard1);
                    // console.log("//////////////////////////////");
                    
                    for (i = 0; i < 10; i++) {
                        leaderboard1[i] = {gamertag: rawLeaderboard1[i].gamertag, data: rawLeaderboard1[i].gamesWon};
                        leaderboard2[i] = {gamertag: rawLeaderboard2[i].gamertag, data: rawLeaderboard2[i].skillLevel + "sr"};
                        leaderboard3[i] = {gamertag: rawLeaderboard3[i].gamertag, data: (rawLeaderboard3[i].nextLevel-1000 + rawLeaderboard3[i].xpLevel) + "xp"};
                    }
                    // console.table(leaderboard1);
                    // console.log("//////////////////////////////");
                    
                    socket.emit("recieve-leaderboard", {error: false, leaderboard1: leaderboard1, leaderboard2: leaderboard2, leaderboard3: leaderboard3});
                    return;
                } else {
                    socket.emit("recieve-leaderboard", {error: true, errorMessage: "Failed to get leaderboard data."});
                    return;
                }
            }
        });
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

// setInterval(() => {
//     for (id in games) {
//         if (games[id].over) {
//             console.log("deleted game " + id);
//             delete games[id];
//         }
//     }
// }, 600000);

em.on("delete-game", (data) => {
    console.log("delete this game: " + data.id);
    delete games[data.id];
});

em.on("game-over", (data) => {
    console.log("Games Over, uploading to database...: " + data.id);
    em.emit("delete-game", {id: data.id});
});

em.on("update-account", (data) => {
    db.query("UPDATE users SET gamesWon='"+data.gamesWon+"',gamesLost='"+data.gamesLost+"',xpLevel='"+data.levelUpNewXpLevel+"',nextLevel='"+data.newNextLevel+"',perkPoints='"+data.perkPoints+"',skillLevel='"+data.skillLevel+"' WHERE playerID='"+data.id+"'",function(error, result) {
        if (error) {
            console.log(error);
        } else {
            let player = findPlayer(data.socketID);

            player.gameID = null;
            player.gamesWon = data.gamesWon;
            player.gamesLost = data.gamesLost;
            player.xpLevel = data.levelUpNewXpLevel;
            player.nextLevel = data.newNextLevel;
            player.perkPoints = data.perkPoints;
            player.perksUnlocked = data.perksUnlocked;
            player.skillLevel = data.skillLevel;
        }
    });
});