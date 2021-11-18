class SceneManager {
    constructor(start) {
        this.scene = start;
        this.splash = new Splash();
        this.matchmaking = false;
        this.fullScreen = false;
        this.bot = false;
        this.botHasMatchMaked = false;
        this.botSelected = true;
        this.player1Animator;
        this.player2Animator;
        this.characterWidth = 1000;
        this.characterHeight = 1000;
        
        //title screen buttons
        this.playButton = new Button(c.width/2-150,c.height/2-75,300,150, "Play");
        
        //main menu buttons
        this.matchmakeButton =  new Button(c.width/2-600,c.height/2-100,300,150, "Matchmake");
        this.perkScreenButton = new Button(c.width/2-150,c.height/2-100,300,150, "Perk Screen");
        this.settingsButton = new Button(c.width/2+300,c.height/2-100,300,150, "Settings");
        this.menuBackButton = new Button(c.width/2-300,c.height/2+300,600,100, "Back");
        
        //settings buttons
        this.settingsFullScreenButton = new Button(c.width/2-150,c.height/2-200,300,150, "Fullscreen");
        this.settingCreditButton = new Button(c.width/2-150,c.height/2,300,150, "Credits");
        this.settingBackButton = new Button(c.width/2-300,c.height/2+300,600,100, "Back");
        
        //perk screen buttons
        this.perkBackButton = new Button(c.width/2-150,c.height/2+300,300,150, "Back");
        
        //credits page buttons
        this.creditBackButton = new Button(c.width/2-150,c.height/2+300,300,150, "Back");
        
        //game buttons
        this.actionButtons = {
            wait: new Button(20,c.height-20-220,296,220,""),
            heal: new Button(336,c.height-20-220,296,220,""),
            attack1: new Button(652,c.height-20-220,296,220,""),
            attack2: new Button(968,c.height-20-220,296,220,""),
            attack3: new Button(1284,c.height-20-220,296,220,""),
            ultimate: new Button(1600,c.height-20-220,296,220,""),
        };
        
        //character select buttons
        this.characterSelect = {
            fire: new Button(0,c.height/2-300,480,600,"Fire"),
            water: new Button(480,c.height/2-300,480,600,"Water"),
            earth: new Button(480+480,c.height/2-300,480,600,"Earth"),
            air: new Button(480+480+480,c.height/2-300,480,600,"Air"),
        };
        
        //game results page buttons
        this.resultsBackButton = new Button(c.width/2-300,c.height/2+300,600,100, "Back");
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
                this.drawPickCharacter();
                break;
            case 7: //game screen
                this.drawGame();
                break;
            case 8: //results screen
                 this.drawGameResults();
                break;
        }

        //tell user if they are connected to server
        if (socket.connected) {
            ctx.fillStyle = "lime";
            ctx.textAlign = "center";
            ctx.font = "20px Arial";
            ctx.fillText("Connected to Server", c.width/2, 30);
        } else {
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.font = "20px Arial";
            ctx.fillText("Not Connected to Server", c.width/2, 30);
            this.scene = 1;
        }

        if (this.bot) {
            switch(this.scene) {
                case 1:
                    this.scene = 4;
                break;
                case 4:
                    if (!this.botHasMatchMaked) {
                        this.botHasMatchMaked = true;
                        matchmake();
                    }
                break;
                case 6:
                    selectPlayer(Math.floor(Math.random()*4)+1);
                    this.scene = 7;
                break;
                case 7:
                    let actions = [0,3,4,5,6,15];
                    let a = 5;

                    if (game.turn && !this.botSelected) {
                        if (game.points >= 15) {
                            console.log("selected action(5)"); action(5);
                        } else if (game.points >= 6) {
                            console.log("selected action(1)"); action(1);
                        } else if (game.points >= 5) {
                            console.log("selected action(4)"); action(4);
                        } else if (game.points >= 4) {
                            console.log("selected action(3)"); action(3);
                        } else if (game.points >= 3) {
                            console.log("selected action(2)"); action(2);
                        } else if (game.points >= 0) {
                            console.log("selected action(0)"); action(0);
                        }
                        this.botSelected = true;
                    }
                break;
                case 8:
                    resetGame();
                    this.botHasMatchMaked = false;
                    this.scene = 4;
                break;
            }
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
        this.settingsFullScreenButton.draw(dt,mouseX, mouseY);
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

        ctx.font = "30px Arial";
        ctx.fillText("Wizard Character",c.width/2-700, 275);

        ctx.font = "15px Arial";
        ctx.fillText("Wizard Pack by LuizMelo (www.luizmelo.itch.io)",c.width/2-700, 340);
        ctx.fillText("Licensed under Creative Commons Zero v1.0 Universal",c.width/2-700, 380);
        ctx.fillText("https://creativecommons.org/publicdomain/zero/1.0/",c.width/2-700, 420);
        ctx.fillText("Parts of this work was remixed.",c.width/2-700, 460);
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

    drawPickCharacter() {
        ctx.fillStyle = "black";
        ctx.fillRect (0,0,c.width, c.height);

        ctx.fillStyle= "white";
        ctx.font = "80px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Pick your character",c.width/2, 150);

        
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

        //draw platforms
        ctx.drawImage(platform, 80,c.height/2+120, 394, 157);
        
        //draw player 1
        this.player1Animator.draw();

        //draw player 2
        if (this.player2Animator != undefined) {
            ctx.save();
            ctx.scale(-1,1);
            ctx.drawImage(platform, -1840,c.height/2+120, 394, 157);
            this.player2Animator.draw();
            ctx.restore();
        }

        //draw character - left
        // switch(game.characterType) {
        //     case 0: 
        //     ctx.drawImage(wizards,0,0,60,90,150,c.height/2-250,266,400);
        //     break;
        //     case 1: 
        //     ctx.drawImage(wizards,60,0,60,90,150,c.height/2-250,266,400);
        //     break;
        //     case 2: 
        //     ctx.drawImage(wizards,120,0,60,90,150,c.height/2-250,266,400);
        //     break;
        //     case 3:
        //         ctx.drawImage(wizards,180,0,60,90,150,c.height/2-250,266,400);
        //         break;
        // }

        // //draw character right
        // ctx.save();
        // ctx.scale(-1,1);
        // ctx.drawImage(platform, -1840,c.height/2+120, 394, 157);
        // switch(game.player2characterType) {
        //     case 0: 
        //     ctx.drawImage(wizards,0,0,60,90,-1504,c.height/2-250,-266,400);
        //     break;
        //     case 1: 
        //     ctx.drawImage(wizards,60,0,60,90,-1504,c.height/2-250,-266,400);
        //     break;
        //     case 2: 
        //     ctx.drawImage(wizards,120,0,60,90,-1504,c.height/2-250,-266,400);
        //     break;
        //     case 3:
        //     ctx.drawImage(wizards,180,0,60,90,-1504,c.height/2-250,-266,400);
        //     break;
        // }
        // ctx.restore();
        
        //which player am I ? 
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "50px Arial";
        ctx.strokeText("Player " + game.whichPlayerAmI, c.width/2, 100);
        ctx.fillText("Player " + game.whichPlayerAmI, c.width/2, 100);

        if (game.turn) {
            ctx.strokeText("Your Turn!", c.width/2, 200);
            ctx.fillText("Your Turn!", c.width/2, 200);

            this.actionButtons.wait.draw(dt, mouseX, mouseY);
            this.actionButtons.heal.draw(dt, mouseX, mouseY);
            this.actionButtons.attack1.draw(dt, mouseX, mouseY);
            this.actionButtons.attack2.draw(dt, mouseX, mouseY);
            this.actionButtons.attack3.draw(dt, mouseX, mouseY);
            this.actionButtons.ultimate.draw(dt, mouseX, mouseY);

            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "30px Arial";
             ctx.fillText("Wait", 20+148, 900);
             ctx.fillText("Heal",336+148, 900);
             ctx.fillText("Attack 1",652+148, 900);
             ctx.fillText("Attack 2",968+148, 900);
             ctx.fillText("Attack 3",1284+148, 900);
             ctx.fillText("Ultimate",1600+148, 900);
             
             
             ctx.font = "20px Arial";
             ctx.fillText("Price: 0", 20+148, 950);
             ctx.fillText("Price: 6",336+148, 950);
             ctx.fillText("Price: 3",652+148, 950);
             ctx.fillText("Price: 4",968+148, 950);
             ctx.fillText("Price: 5",1284+148, 950);
             ctx.fillText("Price: 15",1600+148, 950);

             ctx.fillText("10 Health, 2 points", 20+148, 1000);
             ctx.fillText("30 Health",336+148, 1000);
             ctx.fillText("10 Damage",652+148, 1000);
             ctx.fillText("20 Damage",968+148, 1000);
             ctx.fillText("30 Damage",1284+148, 1000);
             ctx.fillText("70 Damage",1600+148, 1000);
            

        }

        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.font = "40px Arial";
        ctx.fillText("health: " + game.health, 50, 200);
        ctx.fillText("points: " + game.points, 50, 250);
        

        ctx.textAlign = "right";
        ctx.fillText("health: " + game.player2.health, c.width-50, 200);
        ctx.fillText("points: " + game.player2.points, c.width-50, 250);
       
        
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.textAlign = "left";
        ctx.font = "60px Arial";
        ctx.strokeText("You", 50, 100);
        ctx.fillText("You", 50, 100);

        ctx.textAlign = "right";
        
        ctx.strokeText("Opponent",c.width -50, 100);
        ctx.fillText("Opponent",c.width -50, 100);


        if (game.over) {
            ctx.textAlign = "center";
            ctx.font = "100px Arial";
            if (game.win) {
                ctx.fillStyle = "lime";
                ctx.strokeText("You Win!", c.width/2,c.height/2);
                ctx.fillText("You Win!", c.width/2,c.height/2);
            } else {
                ctx.fillStyle = "red";
                ctx.strokeText("You Lose!", c.width/2,c.height/2);
                ctx.fillText("You Lose!", c.width/2,c.height/2);
            }
        }
    }
    drawGameResults() {
        //background
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,c.width,c.height);

        //this will draw the Game results screen text
        ctx.fillStyle= "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Results",c.width/2, 200);
 
        ctx.textAlign = "center";
        ctx.font = "100px Arial";
        if (game.win) {
            ctx.fillStyle = "lime";
            ctx.fillText("You Win!", c.width/2,c.height/2);
        } else {
            ctx.fillStyle = "red";
            ctx.fillText("You Lose!", c.width/2,c.height/2);
        }


        this.resultsBackButton.draw(dt,mouseX,mouseY);
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
                } else if(this.settingsFullScreenButton.mouseOver(mouseX,mouseY)) { 
                    if (this.fullScreen) {
                        document.exitFullscreen();
                        this.fullScreen = false;
                        this.settingsFullScreenButton.setText('FullScreen');
                    }  else {
                        c.requestFullscreen();
                        this.fullScreen = true;
                        this.settingsFullScreenButton.setText('Exit FullScreen');
                    }
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
                    this.player1Animator = new Animator("fire", -170,-60,this.characterWidth,this.characterHeight);
                    this.scene = 7;
                } else if (this.characterSelect.water.mouseOver(mouseX,mouseY)) {
                    selectPlayer(1);
                    this.player1Animator = new Animator("water",-170,-60,this.characterWidth,this.characterHeight);
                    this.scene = 7;
                } else if (this.characterSelect.earth.mouseOver(mouseX,mouseY)) {
                    selectPlayer(2);
                    this.player1Animator = new Animator("earth",-170,-60,this.characterWidth,this.characterHeight);
                    this.scene = 7;
                } else if (this.characterSelect.air.mouseOver(mouseX,mouseY)) {
                    selectPlayer(3);
                    this.player1Animator = new Animator("air",-170,-60,this.characterWidth,this.characterHeight);
                    this.scene = 7;
                } 
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

            case 8://game results
                if (this.resultsBackButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 4;
                    resetGame();
                }
                break;
        }
    }
}