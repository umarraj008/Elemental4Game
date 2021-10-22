module.exports = class Game {
    constructor(p1, p2) {
        player1 = p1;
        player2 = p2;
        winner = null;
        gameId = null;
    }

    pickRandomPlayer() {
        if (Math.floor(Math.random() * 2) >= 1) {
            player1.setTurn(true);
            player2.setTurn(false);
            this.firstTurn();
        } else {
            player1.setTurn(false);
            player2.setTurn(true);
            this.firstTurn();
        }
    }

    firstTurn() {
        if (player1.getTurn()) {
            //tell player 1 its their turn
        } else {
            //tell player 2 its their turn
        }
    }

    nextTurn() {
        //give 2 points
        //give 1 points if health < 40
        //damage if class attacked
        if (player1.getTurn()) {
            //tell player 1 its their turn
            
        } else {
            //tell player 2 its their turn
        }
    }

    playerAction(action) {
        //when recieved player action
        if (player1.getTurn()) {
            //carry out player action
        } else {
            //carry out player action
        }

        //if players are dead
        if (player1.health <= 0) {
            winner = player2.name;
            this.sendResults();
            return;
        } else if (player2.health <= 0) {
            winner = player1.name;
            this.sendResults();
            return;
        }

        //switch player turns
        player1.setTurn(!player1.getTurn());
        player2.setTurn(!player2.getTurn());
        this.nextTurn();
    }

    sendResults() {
        //send winner
        //xp calc
        //skill calc
        //upload reslults to database
    }
}