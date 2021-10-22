module.exports = class Player {
    constructor(s) {
        this.health = 100;
        this.points = 5;
        this.totalDamage = 0;
        this.totalPoints = 0;

        this.attacks = [
            {name: "", cost: 0, damage: ""},
            {name: "", cost: 0, damage: ""},
            {name: "", cost: 0, damage: ""},
            {name: "", cost: 0, damage: ""},
        ];

        this.socket = s;
    }
    
    takeDamage(ammount) {
        this.health -= ammount;
    }
}