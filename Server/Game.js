const Player = require("./Player");

module.exports = class Game {
    constructor(id, p1, p1Name, p2, p2Name) {
        this.id = id;
        this.player1Socket = p1;
        this.player2Socket = p2;
        this.winner = null;
        this.gameId = null;
        this.map = 0;

        this.player1 = new Player(this.player1Socket, "Player 1");
        this.player2 = new Player(this.player2Socket, "Player 2");

        this.ready = 0;
    }

    startGame() {
        //tell players to pick characters
        this.map = Math.floor(Math.random() * 4) + 1;
        this.sendMessageToBothPlayers("game-map", this.map);
        this.sendMessageToBothPlayers("pick-character", this.id);
        this.player1.sendMessage("your-player", 1);
        this.player2.sendMessage("your-player", 2);
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
        this.player1.gameUpdate();
        this.player2.gameUpdate();
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

        //give 1 extra point if players health is low
        if (this.player1.health <= 40) {
            this.player1.points++;
        }
        
        //give 1 extra point if players health is low
        if (this.player2.health <= 40) {
            this.player2.points++;
        }
    
        //update player data
        this.player1.gameUpdate();
        this.player2.gameUpdate();

        let d1 = {health:this.player2.health, points:this.player2.points};
        let d2 = {health:this.player1.health, points:this.player1.points};

        this.player1.sendMessage('other-player', d1);
        this.player2.sendMessage('other-player', d2);

        //check for game over
        if (this.player1.health <= 0) {
            this.winner = this.player2.name;
            this.player1.sendMessage("you-lose");
            this.player2.sendMessage("you-win");
            this.sendResults();
        } else if (this.player2.health <= 0) {
            this.winner = this.player1.name;
            this.player1.sendMessage("you-win");
            this.player2.sendMessage("you-lose");
            this.sendResults();
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
                } else if (action == 1) { //heal
                    this.player1.health += this.player1.attacks[1].heal;
                    this.player1.points -= this.player1.attacks[1].cost;
                } else if (action == 2 || action == 3 || action == 4 || action == 5) {
                    //attacks
                    this.player1.points -= this.player1.attacks[action].cost;
                    this.player2.takeDamage(this.player1.attacks[action].damage);
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
                } else if (action == 1) { //heal
                    this.player2.health += this.player2.attacks[1].heal;
                    this.player2.points -= this.player2.attacks[1].cost;
                } else if (action == 2 || action == 3 || action == 4 || action == 5) {
                    //attacks
                    this.player2.points -= this.player2.attacks[action].cost;
                    this.player1.takeDamage(this.player2.attacks[action].damage);
                }
            } else {
                //console.log("costs too much");
                return;
            }
        }

        this.nextTurn();
    }

    sendResults() {
        //send this.winner
        //xp calc
        //skill calc
        //upload reslults to database
        //this.sendMessageToBothPlayers("game-over", {winner: this.winner});
    }

    sendMessageToBothPlayers(message, data) {
        this.player1.sendMessage(message, data);
        this.player2.sendMessage(message, data);
    }

    playerSelected(id, which) {
        if (id == this.player1Socket.id) {
            this.player1.setPlayer(which);
            this.player1.gameUpdate();
        } else if (id == this.player2Socket.id) {
            this.player2.setPlayer(which);
            this.player2.gameUpdate();
        }

        this.ready++;
        
        if (this.ready == 2) {
            this.player1.sendMessage("other-player-character", this.player2.playerType);
            this.player2.sendMessage("other-player-character", this.player1.playerType);
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
}