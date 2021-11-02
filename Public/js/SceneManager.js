class SceneManager {
    constructor(start) {
        this.scene = start;
        this.splash = new Splash();

        this.playButton = new Button(c.width/2-150,c.height/2-75,300,150, "Play");
        this.settingsButton = new Button(c.width/2-150,c.height/2+100,300,150, "Settings");
        this.matchmakeButton = new Button(c.width/2-150,c.height/2+300,300,150, "Matchmake");

        this.actionButtons = {
            wait: new Button(20,600,200,100,"Wait +2p + 10hp"),
            heal: new Button(200+40,600,200,100,"Heal -6p + 30hp"),
            attack1: new Button(400+60,600,200,100,"Attack 1 -3p +10dam"),
            attack2: new Button(600+80,600,200,100,"Attack 2 -4p +20dam"),
            attack3: new Button(800+100,600,200,100,"Attack 3 -5p +30dam"),
            ultimate: new Button(1000+120,600,200,100,"Ultimate -15p +70dam"),
        };

        this.characterSelect = {
            fire: new Button(20,c.height/2-300,300,600,"Fire"),
            water: new Button(300+20,c.height/2-300,300,600,"Water"),
            earth: new Button(600+20,c.height/2-300,300,600,"Earth"),
            air: new Button(900+20,c.height/2-300,300,600,"Air"),
        };
    }

    run(dt) {
        //switch scenes
        switch(this.scene) {
            case 0: //splash screen
                if (this.splash.draw(dt)) this.scene = 1;
                break;
            case 1: //title screen
                this.drawTitleScreen(dt);
                break;
            case 2: //settings screen
                this.drawSettings();
                break;
            case 3: //credits screen
                this.drawCredits();
                break;
            case 4: //menu screen
                this.drawMenu();
                break;
            case 5: //perk screen
                this.drawPerkScreen();
                break;
            case 6: //pick character screen
                this.pickCharacter();
                break;
            case 7: //game screen
                this.drawGame();
                break;
            case 8: //results screen
                // this.drawGameResults();
                break;
        }
    }

    drawTitleScreen(dt) {
        //background
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,c.width,c.height);
    
        //draw title text
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "100px Arial white";
        ctx.fillText("Elemental 4", c.width/2, c.height/2-200);
        
        // play button
        this.playButton.draw(dt,mouseX,mouseY);

        // settings button
        this.settingsButton.draw(dt,mouseX,mouseY);

        //placeholder
        ctx.font = "50px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText("Play", c.width/2, c.height/2);
        ctx.fillStyle = 'blue';
        ctx.fillText("Settings", c.width/2, c.height/2+200);
        
    }
    drawSettings() {
        ctx.fillStyle = "black";
        ctx.fillRect (0,0,c.width, c.height);
        
        //this will be draw title text 
        ctx.fillStyle = "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Settings",c.width/2, 200);
    }

    drawCredits(){
        ctx.fillStyle = "black";
        ctx.fillRect (0,0,c.width, c.height);
        
        //this will draw the credit title screen.
        ctx.fillStyle= "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Credits",c.width/2, 200);
    }
    
    drawMenu() {
        ctx.fillStyle = "black";
        ctx.fillRect (0,0,c.width, c.height);

        //this will draw the Menu screen text.
        ctx.fillStyle= "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Menu",c.width/2, 200);

        this.matchmakeButton.draw(dt, mouseX, mouseY);
    }

    drawPerkScreen() {
        ctx.fillStyle = "black";
        ctx.fillRect (0,0,c.width, c.height);

        //this will draw the Perk screen text
        ctx.fillStyle= "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Perk Screen",c.width/2, 200);
    }

    pickCharacter() {
        ctx.fillStyle ="black";
        ctx.fillRect(0,0,c.width,c.height);
        this.characterSelect.fire.draw(dt, mouseX, mouseY);
        this.characterSelect.water.draw(dt, mouseX, mouseY);
        this.characterSelect.earth.draw(dt, mouseX, mouseY);
        this.characterSelect.air.draw(dt, mouseX, mouseY);
    }

    drawGame() {
        //background
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,c.width,c.height);

        if (game.turn) {
            this.actionButtons.wait.draw(dt, mouseX, mouseY);
            this.actionButtons.heal.draw(dt, mouseX, mouseY);
            this.actionButtons.attack1.draw(dt, mouseX, mouseY);
            this.actionButtons.attack2.draw(dt, mouseX, mouseY);
            this.actionButtons.attack3.draw(dt, mouseX, mouseY);
            this.actionButtons.ultimate.draw(dt, mouseX, mouseY);
        }

        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.font = "40px Arial";
        ctx.fillText("health: " + game.health, 50, 200);
        ctx.fillText("points: " + game.points, 50, 250);
        ctx.fillText("turn: " + game.turn, 50, 300);

    }

    mouseClick() {
        switch(this.scene) {
            case 1: //title screen
                if (this.playButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 4; 
                } else if (this.settingsButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 2; 
                }
                break;
            case 2: //settings screen
                
                break;
            case 3: //credits screen
                
                break;
            case 4: //menu screen
                if (this.matchmakeButton.mouseOver(mouseX, mouseY)) {
                    matchmake();
                    this.scene = 6;
                }
                break;
            case 5:

                break;
            case 6: //character select
                if (this.characterSelect.fire.mouseOver(mouseX,mouseY)) {
                    selectPlayer(0);
                } else if (this.characterSelect.water.mouseOver(mouseX,mouseY)) {
                    selectPlayer(1);
                } else if (this.characterSelect.earth.mouseOver(mouseX,mouseY)) {
                    selectPlayer(2);
                } else if (this.characterSelect.air.mouseOver(mouseX,mouseY)) {
                    selectPlayer(3);
                } 
                this.scene = 7;
                break;

            case 7: //game
                if (game.turn) {
                    if (this.actionButtons.wait.mouseOver(mouseX, mouseY)) {
                        action(0);
                    } else if (this.actionButtons.heal.mouseOver(mouseX, mouseY)) {
                        action(1);
                    } else if (this.actionButtons.attack1.mouseOver(mouseX, mouseY)) {
                        action(2);
                    } else if (this.actionButtons.attack2.mouseOver(mouseX, mouseY)) {
                        action(3);
                    } else if (this.actionButtons.attack3.mouseOver(mouseX, mouseY)) {
                        action(4);
                    } else if (this.actionButtons.ultimate.mouseOver(mouseX, mouseY)) {
                        action(5);
                    }
                } 
                break;
        }
    }
}