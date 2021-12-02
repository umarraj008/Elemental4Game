module.exports = class User {
    constructor(s, userData) {
        this.socket = s;
        // this.name;
        // this.xp;
        this.gameID = null;
        this.id = userData.id;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.DOB = userData.DOB;
        this.email = userData.email;
        this.gamerTag = userData.gamerTag;
        this.gamesWon = userData.gamesWon;
        this.gamesLost = userData.gamesLost;
        this.xpLevel = userData.xpLevel;
        this.perksUnlocked = userData.perksUnlocked;
        this.nextLevel = userData.nextLevel;
    }
    
}