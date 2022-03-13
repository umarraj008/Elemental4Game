const Player = require("./Player");

module.exports = class Game {
    constructor(id, em, p1, p2, ranked) {
        this.id = id;
        this.player1Socket = p1.socket;
        this.player2Socket = p2.socket;
        this.gameId = id;
        this.map = 0;
        this.ranked = ranked;

        this.player1 = new Player(p1, ranked);
        this.player2 = new Player(p2, ranked);

        this.ready = 0;
        this.em = em;
        this.chat= [];
    }

    startGame() {
        //tell players to pick characters
        this.map = Math.floor(Math.random() * 4) + 1;
        //this.sendMessageToBothPlayers("game-map", this.map);
        this.sendMessageToBothPlayers("pick-character", {gameID: this.id, map: this.map, ranked: this.ranked});
        this.player1.sendMessage("your-player", {which: 1, p2GT: this.player2.gamerTag, p2SL: this.player2.skillLevel, p2NL: this.player2.nextLevel, p2XP: this.player2.xpLevel});
        this.player2.sendMessage("your-player", {which: 2, p2GT: this.player1.gamerTag, p2SL: this.player1.skillLevel, p2NL: this.player1.nextLevel, p2XP: this.player1.xpLevel});
        
        //console.log(this.player1.skillLevel, this.player2.skillLevel);////////////////////////////////////////////
    }

    pickRandomPlayer() {
        if (Math.floor(Math.random() * 2) >= 1) {
            this.player1.setTurn(true);
            this.player2.setTurn(false);
            this.firstTurn();
        } else {
            this.player1.setTurn(false);
            this.player2.setTurn(true);
            this.firstTurn();
        }
    }

    firstTurn() {
        if (this.player1.getTurn()) {
            this.sendMessageToBothPlayers("player1-turn");
        } else {
            this.sendMessageToBothPlayers("player2-turn");
        }
        this.gameUpdate();
    }

    nextTurn() {
        //give 2 points
        //give 1 points if health < 40
        //damage if class attacked
        if (this.player1.getTurn()) {
            //tell player 1 its their turn
            this.player1.setTurn(false);
            this.player2.setTurn(true);
        } else if (this.player2.getTurn()) {
            //tell player 2 its their turn
            this.player1.setTurn(true);
            this.player2.setTurn(false);
        }

        //give 2 points to each player
        this.player1.points += 2;
        this.player2.points += 2;

        //increase perk bar
        this.player1.perkBarValue += 5;
        this.player2.perkBarValue += 5;
        if (this.player1.perkBarValue >= 100) this.player1.perkBarValue = 100;
        if (this.player2.perkBarValue >= 100) this.player2.perkBarValue = 100;

        //give 1 extra point if players health is low
        if (this.player1.health <= 40) {
            this.player1.points++;
        }
        
        //give 1 extra point if players health is low
        if (this.player2.health <= 40) {
            this.player2.points++;
        }
    
        if (this.player1.health <= 0) {this.player1.action = "dead";}
        if (this.player2.health <= 0) {this.player2.action = "dead";}
        
        //update player data
        //this.player1.gameUpdate();
        //this.player2.gameUpdate();
        this.player1.critical = false;
        this.player2.critical = false;
        this.gameUpdate();

        this.player1.action = null;
        this.player2.action = null;

        // let d1 = {health:this.player2.health, points:this.player2.points};
        // let d2 = {health:this.player1.health, points:this.player1.points};

        // this.player1.sendMessage('other-player', d1);
        // this.player2.sendMessage('other-player', d2);

        //check for game over
        // if (this.player1.health <= 0) {
        //     this.winner = this.player2.name;
        //     this.player1.sendMessage("you-lose");
        //     this.player2.sendMessage("you-win");
        //     this.sendResults();
        // } else if (this.player2.health <= 0) {
        //     this.winner = this.player1.name;
        //     this.player1.sendMessage("you-win");
        //     this.player2.sendMessage("you-lose");
        //     this.sendResults();
        // }

        if (this.player1.health <= 0) {
            this.sendResults(2);
        } else if (this.player2.health <= 0) {
            this.sendResults(1);
        }

    }

    playerAction(action) {
        //when recieved player action
        //if player 1 action
        if (this.player1.getTurn()) {
            if (this.player1.points >= this.player1.attacks[action].cost) {
                if (action == 0) { //wait
                    this.player1.health += this.player1.attacks[0].heal;
                    this.player1.points -= this.player1.attacks[0].cost;
                    this.player1.action = "wait";
                    if (this.player1.health >= 200) this.player1.health = 200;
                } else if (action == 1) { //heal
                    this.player1.health += this.player1.attacks[1].heal;
                    this.player1.points -= this.player1.attacks[1].cost;
                    this.player1.totalPoints += this.player1.attacks[1].cost;
                    this.player1.action = "heal";
                    if (this.player1.health >= 200) this.player1.health = 200;
                } else if (action == 2 || action == 3 || action == 4 || action == 5) {
                    //attacks
                    this.player1.points -= this.player1.attacks[action].cost;
                    this.player1.totalPoints += this.player1.attacks[action].cost;

                    // let criticalDamage = 0;
                    // if (Math.random()*100 <= 100*this.player1.criticalDamageChance) {
                    //     this.player1.critical = true;
                    //     criticalDamage = this.player1.attacks[action].damage * this.player1.criticalDamage;
                    // }
                    
                    let damage = this.player1.attacks[action].damage; // + this.player1.damageBoost + criticalDamage;
                    this.player2.perkBarValue += damage;
                    if (this.player2.perkBarValue >= 100) this.player2.perkBarValue = 100;
                    this.player1.totalDamage += damage;
                    this.player2.takeDamage(damage);
                    this.player1.action = "attack" + (action-1);
                    this.player2.action = "damage";
                } else if (action == 6) { //perk activated
                    switch (this.player1.selectedPerk) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                        case 4:
                            break;
                        case 5:
                            break;
                        case 6:
                            break;
                        case 7:
                            break;
                        case 8:
                            break;
                    }
                }
            } else {
                //console.log("costs too much");
                return;
            }
        } else if (this.player2.getTurn()) {
            if (this.player2.points >= this.player2.attacks[action].cost) {
                if (action == 0) { //wait
                    this.player2.health += this.player2.attacks[0].heal;
                    this.player2.points -= this.player2.attacks[0].cost;
                    this.player2.action = "wait";
                    if (this.player2.health >= 200) this.player2.health = 200;
                } else if (action == 1) { //heal
                    this.player2.health += this.player2.attacks[1].heal;
                    this.player2.points -= this.player2.attacks[1].cost;
                    this.player2.totalPoints += this.player2.attacks[1].cost;
                    this.player2.action = "heal";
                    if (this.player2.health >= 200) this.player2.health = 200;
                } else if (action == 2 || action == 3 || action == 4 || action == 5) {
                    //attacks
                    this.player2.points -= this.player2.attacks[action].cost;
                    this.player2.totalPoints += this.player2.attacks[action].cost;

                    // let criticalDamage = 0;
                    // if (Math.random()*100 <= 100*this.player2.criticalDamageChance) {
                    //     this.player2.critical = true;
                    //     criticalDamage = this.player2.attacks[action].damage * this.player2.criticalDamage;
                    // }
                    
                    let damage = this.player2.attacks[action].damage; // + this.player2.damageBoost + criticalDamage;
                    this.player1.perkBarValue += damage;
                    if (this.player1.perkBarValue >= 100) this.player1.perkBarValue = 100;
                    this.player2.totalDamage += damage;
                    this.player1.takeDamage(damage);
                    this.player2.action = "attack" + (action-1);
                    this.player1.action = "damage";
                } else if (action == 6) { //perk activated
                    switch (this.player1.selectedPerk) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                        case 4:
                            break;
                        case 5:
                            break;
                        case 6:
                            break;
                        case 7:
                            break;
                        case 8:
                            break;
                    }
                }
            } else {
                //console.log("costs too much");
                return;
            }
        }

        this.nextTurn();
    }

    sendResults(winner) {
        //send this.winner
        //xp calc
        //skill calc
        //upload reslults to database
        //this.sendMessageToBothPlayers("game-over", {winner: this.winner});
        // this.over = true;

        //xp calc
        //skill calc
        //send to client
        //send to database
        //delete game

        //ranked calculation
        if (this.ranked) {

        }

        let baseXP = 1000;
        let p1Data = this.player1.calculateXP(baseXP, (winner == 1) ? true: false);
        let p2Data = this.player2.calculateXP(baseXP, (winner == 2) ? true: false);
        
        this.em.emit("update-account", p1Data);
        this.em.emit("update-account", p2Data);
        this.em.emit("delete-game", {id: this.id});
    }

    sendMessageToBothPlayers(message, data) {
        this.player1.sendMessage(message, data);
        this.player2.sendMessage(message, data);
    }

    playerSelected(id, which) {
        if (id == this.player1Socket.id) {
            this.player1.setPlayer(which);
            //this.player1.gameUpdate();
        } else if (id == this.player2Socket.id) {
            this.player2.setPlayer(which);
            //this.player2.gameUpdate();
        }

        this.ready++;
        
        if (this.ready == 2) {
            this.player1.sendMessage("other-player-character", this.player2.playerType);
            this.player2.sendMessage("other-player-character", this.player1.playerType);
            this.gameUpdate();
            this.pickRandomPlayer();      
        }
    }

    matchCancelled(whoLeft) {
        if (whoLeft == this.player1Socket.id) {
            this.player2.sendMessage("game-cancelled");
        } else if (whoLeft == this.player2Socket.id) {
            this.player1.sendMessage("game-cancelled");
        }
    }

    gameUpdate() {
        let gameData1 = {
            points: this.player1.points,
            health: this.player1.health,
            turn: this.player1.turn,
            action: this.player1.action,
            critical: this.player1.critical,
            perkBarValue: this.player1.perkBarValue,
            
            p2Points: this.player2.points,
            p2Health: this.player2.health,
            p2Turn: this.player2.turn,
            p2Action: this.player2.action,
            p2Critical: this.player2.critical,
            p2PerkBarValue: this.player2.perkBarValue,
        };

        this.player1.sendMessage("game-update", gameData1);

        let gameData2 = {
            points: this.player2.points,
            health: this.player2.health,
            turn: this.player2.turn,
            action: this.player2.action,
            critical: this.player2.critical,
            perkBarValue: this.player2.perkBarValue,

            p2Points: this.player1.points,
            p2Health: this.player1.health,
            p2Turn: this.player1.turn,
            p2Action: this.player1.action,
            p2Critical: this.player1.critical,
            p2PerkBarValue: this.player1.perkBarValue,
        };
        
        this.player2.sendMessage("game-update", gameData2);
    }

    sendTextChatMessage(message){
        this.chat += message;
        this.sendMessageToBothPlayers("update-chat", message);
    }
}