class SceneManager {
    constructor(start) {
        this.scene = start;
        this.splash = new Splash();
        this.matchmaking = false;

        this.playButton = new Button(c.width/2-150,c.height/2-75,300,150, "Play");
        this.settingsButton = new Button(c.width/2+300,c.height/2-100,300,150, "Settings");
        this.matchmakeButton =  new Button(c.width/2-600,c.height/2-100,300,150, "Matchmake");
        this.actionButtons = {
            wait: new Button(20,600,200,100,"Wait +2p + 10hp"),
            heal: new Button(200+80,600,200,100,"Heal -6p + 30hp"),
            attack1: new Button(400+100,600,200,100,"Attack 1 -3p +10dam"),
            attack2: new Button(600+120,600,200,100,"Attack 2 -4p +20dam"),
            attack3: new Button(800+140,600,200,100,"Attack 3 -5p +30dam"),
            ultimate: new Button(1000+160,600,200,100,"Ultimate -15p +70dam"),
        };

        this.characterSelect = {
            fire: new Button(20,c.height/2-300,300,600,"Fire"),
            water: new Button(300+20,c.height/2-300,300,600,"Water"),
            earth: new Button(600+20,c.height/2-300,300,600,"Earth"),
            air: new Button(900+20,c.height/2-300,300,600,"Air"),
        };

        this.settingBackButton = new Button(c.width/2-150,c.height/2+300,300,150, "Back");
        this.settingCreditButton = new Button(c.width/2-150,c.height/2+100,300,150, "Credits");
        this.creditBackButton = new Button(c.width/2-150,c.height/2+300,300,150, "Back");
        this.perkScreenButton = new Button(c.width/2-150,c.height/2-100,300,150, "Perk Screen");
        this.perkBackButton = new Button(c.width/2-150,c.height/2+300,300,150, "Back");
        this.menuBackButton = new Button(c.width/2-300,c.height/2+300,600,100, "Back");
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

        //tell user if they are connected to server
        if (socket.connected) {
            ctx.fillStyle = "lime";
            ctx.textAlign = "left";
            ctx.font = "30px Arial";
            ctx.fillText("Connected to Server", 50, c.height-100);
        } else {
            ctx.fillStyle = "red";
            ctx.textAlign = "left";
            ctx.font = "30px Arial";
            ctx.fillText("Not Connected to Server", 50, c.height-100);
        }
    }

    drawTitleScreen(dt) {
        //background
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,c.width,c.height);
    
        //draw title text
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "100px Arial";
        ctx.fillText("Elemental 4", c.width/2, c.height/2-200);
        
        // play button
        this.playButton.draw(dt,mouseX,mouseY);

        

        
    }
    drawSettings() {
        ctx.fillStyle = "black";
        ctx.fillRect (0,0,c.width, c.height);
        
        //this will be draw title text 
        ctx.fillStyle = "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Settings",c.width/2, 200);

        //button section for settings
        this.settingBackButton.draw (dt,mouseX, mouseY);
        this.settingCreditButton.draw(dt,mouseX, mouseY);
    }

    
    drawCredits(){
        ctx.fillStyle = "black";
        ctx.fillRect (0,0,c.width, c.height);
        
        //this will draw the credit title screen.
        ctx.fillStyle= "Blue";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        ctx.fillText("CyberCloud Studios",c.width/2, 200);

        //button section for credits
        this.creditBackButton.draw (dt,mouseX, mouseY);

        //This will be the actual credits
       
        ctx.fillStyle= "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";

        ctx.fillText("Ice, Lava and Air Background",c.width/2, 275);

        ctx.font = "15px Arial";
        ctx.fillText("Glacial Mountains: Parallax Background by Vicente Nitti (www.vnitti.itch.io)",c.width/2, 340);
        ctx.fillText("Licensed under Creative Commons: By Attribution 4.0 License",c.width/2, 380);
        ctx.fillText("http://creativecommons.org/licenses/by/4.0/",c.width/2, 420);
        ctx.fillText("Parts of this work was remixed.",c.width/2, 460);

        ctx.font = "30px Arial";
        ctx.fillText("Earth Background",c.width/2, 595);

        ctx.font = "15px Arial";
        ctx.fillText("Grassy Mountains: Parallax Background by Vicente Nitti (www.vnitti.itch.io)",c.width/2, 660);
        ctx.fillText("Licensed under Creative Commons: By Attribution 4.0 License",c.width/2, 700);
        ctx.fillText("http://creativecommons.org/licenses/by/4.0/",c.width/2, 740);
        ctx.fillText("Parts of this work was remixed.",c.width/2, 780);
    }
    
    drawMenu() {
        ctx.fillStyle = "black";
        ctx.fillRect (0,0,c.width, c.height);

        //this will draw the Menu screen text.
        ctx.fillStyle= "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Menu",c.width/2, 200);

        if (this.matchmaking) {
            ctx.font = "50px Arial";
            ctx.fillStyle = "Red";
            ctx.fillText("Matchmaking...", c.width/2, c.height/2-200);
        } else {
            this.matchmakeButton.draw(dt, mouseX, mouseY);
        }

        this.perkScreenButton.draw(dt,mouseX,mouseY);
        this.settingsButton.draw(dt,mouseX,mouseY);
        this.menuBackButton.draw(dt,mouseX,mouseY);
    
    }

    drawPerkScreen() {
        ctx.fillStyle = "black";
        ctx.fillRect (0,0,c.width, c.height);

        //this will draw the Perk screen text
        ctx.fillStyle= "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Perk Screen",c.width/2, 200);

        this.perkBackButton.draw(dt,mouseX,mouseY);

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

        //maps
        switch(game.map) {
            case 1: 
            ctx.drawImage(airBackground,0,0,c.width,c.height);
            break;
            case 2: 
            ctx.drawImage(earthBackground,0,0,c.width,c.height);
            break;
            case 3: 
            ctx.drawImage(fireBackground,0,0,c.width,c.height);
            break;
            case 4:
            ctx.drawImage(waterBackground,0,0,c.width,c.height); 
            break;
        }

        //which player am I ? 
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "50px Arial";
        ctx.fillText("Player " + game.whichPlayerAmI, c.width/2, 100);

        if (game.turn) {
            ctx.fillText("Your Turn!", c.width/2, 200);

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

        if (game.over) {
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.font = "100px Arial";
            ctx.fillText("Game Over!", c.width/2,c.height/2);
            ctx.fillText(game.winner + " Wins!", c.width/2,c.height/2+100);
        }
    }

    mouseClick() {
        switch(this.scene) {
            case 1: //title screen
                if (this.playButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 4; 
                }
                break;
            case 2: //settings screen
                if(this.settingBackButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 4;
                } else if (this.settingCreditButton.mouseOver(mouseX,mouseY)){          
                    this.scene = 3;
                }
                break;
            case 3: //credits screen
                if(this.creditBackButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 2;
                }
                break;
            case 4: //menu screen
                if (this.matchmakeButton.mouseOver(mouseX, mouseY)) {
                    matchmake();
                } else if (this.perkScreenButton.mouseOver(mouseX,mouseY)){          
                    this.scene = 5;
                } else if (this.settingsButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 2; 
                } else if (this.menuBackButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 1; 
                }
                   
                break;
            case 5: //perk screen
                if(this.perkBackButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 4;
                }

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