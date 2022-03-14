module.exports = class Player {
    constructor(data, ranked) {
        this.health = 100;
        this.points = 5;
        this.totalDamage = 0;
        this.totalPoints = 0;
        this.playerType = null;
        this.turn = false;
        this.action = null;
        this.gamerTag = data.gamerTag;
        this.xpLevel = data.xpLevel;
        this.nextLevel = data.nextLevel;
        this.id = data.id;
        this.gamesWon = data.gamesWon;
        this.gamesLost = data.gamesLost;
        this.socket = data.socket;
        this.perksUnlocked = data.perksUnlocked.split(",");
        this.perkPoints = data.perkPoints;
        this.skillLevel = data.skillLevel;
        this.damageBoost = 0;
        this.criticalDamage = 0.2;
        this.criticalDamageChance = 0.01;
        this.critical = false;
        this.ranked = ranked;
        this.attacks = [
            {name: "Wait", cost: -2, heal: 10},
            {name: "Heal", cost: 6, heal: 30},
            {name: "Attack 1", cost: 3, damage: 10},
            {name: "Attack 2", cost: 4, damage: 20},
            {name: "Attack 3", cost: 5, damage: 30},
            {name: "Ultimate", cost: 15, damage: 70},
        ];
        this.perkBarValue = 0;
        this.perkActivated = false;
        this.currentPerk = null;
        //this.selectedPerk = this.perksUnlocked.forEach(perk => {if (perk == 2) return this.perksUnlocked.indexOf(perk)});
        // //starting health
        // switch (parseInt(this.perksUnlocked[0])) {
        //     case 1: this.damageBoost = 5; break;
        //     case 2: this.damageBoost = 10; break;
        //     case 3: this.damageBoost = 15; break;
        //     case 4: this.damageBoost = 20; break;   
        // } 

        // //damage boost
        // switch (parseInt(this.perksUnlocked[1])) {
        //     case 1: this.health = 100 + 15; break;  
        //     case 2: this.health = 100 + 30; break;
        //     case 3: this.health = 100 + 50; break;   
        //     case 4: this.health = 100 + 70; break;
        // } 

        // //critical damage ammount
        // switch (parseInt(this.perksUnlocked[2])) {
        //     case 1: this.criticalDamage = 0.4; break;  
        //     case 2: this.criticalDamage = 0.6; break;    
        //     case 3: this.criticalDamage = 0.8; break;    
        //     case 4: this.criticalDamage = 1; break;  
        // } 

        // //critical damage chance
        // switch (parseInt(this.perksUnlocked[3])) {
        //     case 1: this.criticalDamageChance = 0.03; break;  
        //     case 2: this.criticalDamageChance = 0.08; break;    
        //     case 3: this.criticalDamageChance = 0.15; break;    
        //     case 4: this.criticalDamageChance = 0.30; break;    
        // } 
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

    calculateXP(base, winner) {
        let xpGain = base + ((base/2) * (this.totalDamage/100));
        
        let oldXpLevel = this.xpLevel;
        let oldNextLevel = this.nextLevel;
        
        let newXpLevel = this.xpLevel + xpGain;
        
        let levelUp = false;
        let newNextLevel = oldNextLevel;
        let levelUpNewXpLevel = newXpLevel;

        if (newXpLevel > newNextLevel) {
            levelUp = true;
            newXpLevel = oldNextLevel;
            levelUpNewXpLevel = newXpLevel - oldNextLevel;
            newNextLevel = oldNextLevel + 1000;
            this.perkPoints++;
        }

        // let slGain = 0;
        //let oldSkillLevel = 0;
        // let newSkillLevel = 0;
        // let skillLevelUp = false;
        // let skillLevelDown = false;

        if (winner) {
            this.gamesWon++;
            
            // if (this.ranked) {
            //     slGain = 10 + Math.floor((this.totalDamage/this.totalPoints));
            //     oldSkillLevel = this.skillLevel;
            //     newSkillLevel = this.skillLevel + slGain;
            //     skillLevelUp = false;

            //     if (Math.floor(newSkillLevel/100) >= Math.floor((oldSkillLevel/100)+1)) {
            //         skillLevelUp = true;
            //     }
            // }
            //oldSkillLevel = this.skillLevel;
            // if (this.ranked) this.skillLevel += 10 + Math.floor((this.totalDamage/this.totalPoints));
            if (this.ranked) this.skillLevel += Math.floor(10 + (5 * (this.totalDamage/100)));
        } else {
            this.gamesLost++;
            if (this.ranked) {
                this.skillLevel -= Math.floor(10 + (5 * (this.totalDamage/100)));
                if (this.skillLevel <= 0) {
                    this.skillLevel = 0;
                }
            }
        }

        let data = {
            id: this.id,
            socketID: this.socket.id,
            gamesWon: this.gamesWon,
            gamesLost: this.gamesLost,
            winner: winner,
            xpGain: xpGain,
            oldXpLevel: oldXpLevel,
            oldNextLevel: oldNextLevel,
            newXpLevel: newXpLevel,
            levelUp: levelUp,
            levelUpNewXpLevel: levelUpNewXpLevel,
            newNextLevel: newNextLevel,
            perkPoints: this.perkPoints,
            perksUnlocked: this.perksUnlocked[0] + "," + this.perksUnlocked[1] + "," + this.perksUnlocked[2] + "," + this.perksUnlocked[3],
            skillLevel: this.skillLevel,
            // slGain: slGain,
            //oldSkillLevel: oldSkillLevel,
            // newSkillLevel: newSkillLevel,
            // skillLevelUp: skillLevelUp,
        };

        this.sendMessage("game-over", data);
        return data;
    }

    getTurn() { return this.turn; }
}