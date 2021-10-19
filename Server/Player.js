class Player {
    constructor() {
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
    }
    
    takeDamage(ammount) {
        this.health -= ammount;
    }
}