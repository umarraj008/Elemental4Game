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
            };

            var game = new Game(gameID, em, player1, player2);
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
                } else {

                }
            } else {
                socket.emit("register-failed", "Register failed");
            }
        });
        db.query("SELECT * FROM users WHERE gamertag='"+data.gamerTag+"'",function(error, result) {
            if (!error) {
                if(result.length >= 1) {
                    socket.emit("register-failed", "Account with the same gamertag already exists");
                } else {

                }
            } else {
                socket.emit("register-failed", "Register failed");
            }
        });
        db.query("INSERT INTO users(firstName, lastName, dob, email, password, gamertag, gamesWon, gamesLost, xpLevel, perksUnlocked, nextLevel) VALUES('"+data.firstName+"','"+data.lastName+"','"+data.DOB+"', '"+data.email+"', '"+data.password+"', '"+data.gamerTag+"', '0','0','0','0,0,0,0','1000')",function(error, result) {
            if (!error) {
                
            } else {
                socket.emit("register-failed", "Register failed");
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
                    }
                    socket.emit("register-success", data);
                } 
            } else {
                socket.emit("register-failed", "Register failed");
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
    db.query("UPDATE users SET gamesWon='"+data.gamesWon+"',gamesLost='"+data.gamesLost+"',xpLevel='"+data.levelUpNewXpLevel+"',nextLevel='"+data.newNextLevel+"' WHERE playerID='"+data.id+"'",function(error, result) {
        if (error) {
            console.log(error);
        } else {
            let player = findPlayer(data.socketID);

            player.gameID = null;
            player.gamesWon = data.gamesWon;
            player.gamesLost = data.gamesLost;
            player.xpLevel = data.levelUpNewXpLevel;
            player.nextLevel = data.newNextLevel;
        }
    });
});