module.exports = class Player {
    constructor(s) {
        this.health = 100;
        this.points = 5;
        this.totalDamage = 0;
        this.totalPoints = 0;
        this.playerType = null;
        this.turn = false;
        this.action = null;

        this.attacks = [
            {name: "Wait", cost: -2, heal: 10},
            {name: "Heal", cost: 6, heal: 30},
            {name: "Attack 1", cost: 3, damage: 10},
            {name: "Attack 2", cost: 4, damage: 20},
            {name: "Attack 3", cost: 5, damage: 30},
            {name: "Ultimate", cost: 15, damage: 70},
        ];

        this.socket = s;
    }
    
    takeDamage(ammount) {
        this.health -= ammount;
    }

    sendMessage(message, data) {
        this.socket.emit(message, data)
    }

    // gameUpdate() {
    //     this.socket.emit("game-update", {points: this.points, health: this.health, turn: this.turn});
    // }

    setPlayer(which) {
        this.playerType = which;
    }

    setTurn(t) {
        this.turn = t;
    } 

    getTurn() { return this.turn; }
}