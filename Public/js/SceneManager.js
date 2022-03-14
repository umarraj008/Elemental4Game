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
        this.characterWidth = 1280;
        this.characterHeight = 800;
        this.character1X = -400;
        this.character1Y = -100;
        this.character2X = -1000;
        this.character2Y = -100;
        this.cloud1pos = {x:0};
        this.cloud2pos = {x:0};
        this.cloud3pos = {x:0};
        this.cloud4pos = {x:0};
        this.cloud5pos = {x:0};
        // this.cloudMoveSpeed = 0.1;
        // this.titleCurrentMap = Math.floor(Math.random()*3)+1;
        this.titleMapTimer = 0;
        this.titleMapDuration = 5000;
        // this.windParticleSystem = new WindParticleSystem();
        this.player1HealthBar = new HealthBar(50,120,700,30,0,200, false);
        this.player2HealthBar = new HealthBar(-(c.width-50), 120, 700, 30,0,200, false);
        this.player1PerkBar = new HealthBar(50,150,700,10,0,100, true); this.player1PerkBar.color1 = "yellow";
        this.player2PerkBar = new HealthBar(-(c.width-50), 150, 700, 10,0,100, true); this.player2PerkBar.color1 = "yellow";
        this.xpHealthBar = new HealthBar(c.width/2-450, c.height/2+170, 900, 30, 0, 100, true);
        this.xpHealthBar.speed = 0.07;
        this.skillLevelHealthBar = new HealthBar(c.width/2-450, c.height/2+280, 900, 30, 0, 100, true);
        this.skillLevelHealthBar.speed = 0.07;
        this.credits = new Credits();
        this.selectedPerk = 0;
        this.camera = new Camera();
        this.maps = new Maps();
        this.angle = 0;

        this.ranks = ["Copper","Silver","Gold","Diamond","Warrior"];

        this.leaderboard1 = [];
        this.leaderboard2 = [];
        this.leaderboard3 = [];

        //title screen buttons
        this.playButton = new Button(c.width/2-300,c.height/2-75,600,100, "Play");
        
        //main menu buttons
        this.stopMatchmakeButton =  new Button(c.width/2-150,c.height/2-100,300,150, "Stop Matchmaking");
        this.matchmakeButton =  new Button(c.width/2-600,c.height/2-100,300,150, "Quick Matchmake");
        this.perkScreenButton = new Button(c.width/2-150,c.height/2-100,300,150, "Perk Screen");
        this.settingsButton = new Button(c.width/2+300,c.height/2-100,300,150, "Settings");
        this.menuBackButton = new Button(c.width/2-300,c.height/2+300,600,100, "Back");
        this.projectWebsiteButton = new Button(50,c.height-200,300,150, "Project Website");
        this.profilePageButton = new Button(c.width-350,c.height-200,300,150, "Profile");
        this.rankedMatchmakeButton = new Button(c.width/2-150,c.height/2+100,300,150, "Ranked Matchmake")
        this.leaderboardButton = new Button(c.width/2-150,c.height/2-270,300,150, "Leaderboard");
        
        //settings buttons
        // this.settingsFullScreenButton = new Button(c.width/2-150,c.height/2-200,300,150, "Fullscreen");
        // this.settingCreditButton = new Button(c.width/2-150,c.height/2,300,150, "Credits");
        
        //perk screen buttons
        this.perkBackButton = new Button(c.width/2-300,c.height/2+420,600,80,"Back");

        //credits page buttons
        this.creditBackButton = new Button(c.width/2-150,c.height/2+300,300,150, "Back");
        
        //profile page buttons
        this.profileBackButton = new Button(c.width/2-150,c.height/2+300,300,150, "Back");
        this.profilePagePanel =new Panel(c.width/2-350, 120, 700, 650);

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
        
        //Leaderboard buttons
        this.leaderboardBackButton = new Button(c.width/2-300,c.height/2+400,600,100, "Back");
        this.leaderboardPanel1 = new Panel(380 - 250, 150, 560, 640);
        this.leaderboardPanel2 = new Panel(c.width/2 - 250, 150, 560, 640);
        this.leaderboardPanel3 = new Panel(c.width - 380 -250, 150, 560, 640);

        //game results page buttons
        this.resultsBackButton = new Button(c.width/2-300,c.height/2+400,600,100, "Back");

        this.logoutButton = new Button(50, c.height-200,300,150, "Logout");

        this.perkButtonWidth = 390;
        this.perkButtonHeight = 242;
        this.perkButtons = [
            new Button(50,                               150, this.perkButtonWidth, this.perkButtonHeight, "Absorption" ),
            new Button(50 + this.perkButtonWidth + 20,   150, this.perkButtonWidth, this.perkButtonHeight, "Strength Boost "),
            new Button(50 + (this.perkButtonWidth+20)*2, 150, this.perkButtonWidth, this.perkButtonHeight, "Points Boost"),
            
            new Button(50,                               150+20+this.perkButtonHeight, this.perkButtonWidth, this.perkButtonHeight, "Just Wait"),
            new Button(50 + this.perkButtonWidth + 20,   150+20+this.perkButtonHeight, this.perkButtonWidth, this.perkButtonHeight, "Max Health"),
            new Button(50 + (this.perkButtonWidth+20)*2, 150+20+this.perkButtonHeight, this.perkButtonWidth, this.perkButtonHeight, "Deflection"),
            
            new Button(50,                               150+(20+this.perkButtonHeight)*2, this.perkButtonWidth, this.perkButtonHeight, "Rebound"),
            new Button(50 + this.perkButtonWidth + 20,   150+(20+this.perkButtonHeight)*2, this.perkButtonWidth, this.perkButtonHeight, "Double Damage"),
            new Button(50 + (this.perkButtonWidth+20)*2, 150+(20+this.perkButtonHeight)*2, this.perkButtonWidth, this.perkButtonHeight, "Double Take"),
        ];

        this.perkButtons[0].font = "40px pixel";
        this.perkButtons[1].font = "40px pixel";
        this.perkButtons[2].font = "40px pixel";
        this.perkButtons[3].font = "40px pixel";
        this.perkButtons[4].font = "40px pixel";
        this.perkButtons[5].font = "40px pixel";
        this.perkButtons[6].font = "40px pixel";
        this.perkButtons[7].font = "40px pixel";
        this.perkButtons[8].font = "40px pixel";
        
        this.perkBuyButton = new Button(1364,400,470,80, "Buy Perk");
        this.perkActivateButton = new Button(1364,500,470,80, "Activate Perk");
        this.perkButtons[0].selected = true;
        this.perkDescription = [
            {string: "Absorb 50% of the opponents next attack.", price: 5},
            {string: "Your next attack will do 50% increased damage.", price: 5},
            {string: "You will instantly gain 10 points.", price: 5},
            {string: "Your opponent cannot attack or heal,", string2: "they can only wait.", price: 10},
            {string: "You instantly gain full health.", price: 10},
            {string: "The opponents next attack will be deflected.", price: 10},
            {string: "The opponents next attack will", string2: "rebound onto themself.", price: 20},
            {string: "Your next attack will do double damage.", price: 20},
            {string: "Take a second turn!", price: 20},
        ];

        this.indicators = new IndicatorSystem();
        this.perkConfirmWindow = false;
        this.perkConfirmConfirmButton = new Button(c.width/2-310, c.height/2, 300, 100, "Confirm");
        this.perkConfirmCancelButton = new Button(c.width/2+10, c.height/2, 300, 100, "Cancel");

        // this.backgroundCharacters = {
        //     fire: new Animator("fire",-200, 200, 1280,800),
        //     water: new Animator("water",-450, 0, 1280,800),
        //     earth: new Animator("earth",-c.width-750, -250, 1280*1.4,800*1.4),
        //     air: new Animator("air",-c.width-200, 200, 1280,800),
        // };

        this.settingsButtons = {
            panel:               new Panel(20, 120, c.width-50, 800),
            frameRate30FPS:      new Button(400, 200, 400, 100, "30fps"),
            frameRate60FPS:      new Button(800, 200, 400, 100, "60fps"),
            windParticlesOn:     new Button(400, 300+20, 400, 100, "On"),
            windParticlesOff:    new Button(800, 300+20, 400, 100, "Off"),
            debrisParticlesOn:   new Button(400, 400+40, 400, 100, "On"),
            debrisParticlesOff:  new Button(800, 400+40, 400, 100, "Off"),
            movingBackgroundOn:  new Button(400, 500+60, 400, 100, "On"),
            movingBackgroundOff: new Button(800, 500+60, 400, 100, "Off"),
            textIndicatorsOn:    new Button(400, 600+80, 400, 100, "On"),
            textIndicatorsOff:   new Button(800, 600+80, 400, 100, "Off"),
            fullscreenOn:        new Button(400, 700+100, 400, 100, "On"),
            fullscreenOff:       new Button(800, 700+100, 400, 100, "Off"),
            gameCredits:         new Button(1300, 200, 540, 100, "Game Credits"),
            accessFeatures:      new Button(1300, 320, 540, 100, "Accessibility Options"),
            backButton:          new Button(c.width/2-300,c.height/2+400,600,100, "Back"),
        };

        this.resultsPanel = new Panel(c.width/2-500,c.height/2-300,1000, 600);
        this.resultsPanel2 = new Panel(c.width/2-500,c.height/2-300,1000, 680);
        this.perkConfirmPanel = new Panel(c.width/2-400,c.height/2-300, 800, 500);
        this.perkPanel = new Panel(1300,150,589,766);

        this.perkActivationButton = new Button(610, 670, 700, 150, "Activate Perk"); //for in game

        //accesibility page
        this.accessPageBackButton = new Button(c.width/2-300,c.height/2+400,600,100, "Back"); 
        
        this.accessPageContrastAddButton = new Button(700, 200,100,100,"+");
        this.accessPageContrastSubtractButton = new Button(400,200,100,100,"-");

        this.accessPageColorBlindnessNoneButton = new Button(400,350,400,100,"None");
        this.accessPageColorBlindness1Button = new Button(800,350,400,100,"Red-Blind/Protanopia");
        this.accessPageColorBlindness2Button = new Button(1200,350,400,100,"Green-Blind/Deuteranopia");
        this.accessPageColorBlindness3Button = new Button(400,450,400,100,"Blue-Blind/Tritanopia");

        this.accessPageLanguage1 = new Button(400,600,400,100,"English");
        this.accessPageLanguage2 = new Button(800,600,400,100,"Spanish");
        this.accessPageLanguage3 = new Button(1200,600,400,100,"French");
        this.accessPageLanguage4 = new Button(400,700,400,100,"Italian");
        this.accessPageLanguage5 = new Button(800,700,400,100,"Chinese");
        this.accessPageLanguage6 = new Button(1200,700,400,100,"Japanese");
    } 

    run() {
        ctx.clearRect(0,0,c.width,c.height);

        //contrast setting
        if(SETTINGS.contrast != 100) {
            ctx.filter = "contrast(" + SETTINGS.contrast/100 + ")";
        } else {
            ctx.filter = "none";
        }
        

        //switch scenes
        switch(this.scene) {
            case -2: //loading screen
                ctx.fillStyle = "black";
                ctx.fillRect(0,0,c.width,c.height);
                ctx.save();
                ctx.translate(c.width/2,c.height/2);
                ctx.rotate(this.angle * Math.PI/180);
                ctx.beginPath();
                ctx.arc(0,0,100,0,230 * Math.PI/180);
                ctx.strokeStyle = "white";
                ctx.lineWidth = "20";
                ctx.stroke();
                ctx.restore();
                this.angle += 0.4 * dt;
                break;
                
            case -1: //login screen
                ctx.drawImage(waterMapBlur, 0, 0, c.width, c.height);
                ctx.drawImage(titleImage, 0, 198.25, 1389, 198, c.width/2-694,c.height/2-400, 1389, 198);
                ctx.drawImage(allCharacters, 0, 0, c.width, c.height);

                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.font = "16px Arial";
                ctx.fillText("©Cybercloud Studios", c.width/2, c.height-50);
                break;
            case 0: //splash screen
                if (this.splash.draw()) {this.camera.transitionTo(1,0.005);} ;
                break;
            case 1: //title screen
                this.drawTitleScreen();
                if (socket.connected) {
                    ctx.fillStyle = "lime";
                    ctx.textAlign = "center";
                    ctx.font = "20px " + FONT;
                    ctx.fillText(CURRENT_LANGUAGE.title.connectedToServer, c.width/2, 30);
                } else {
                    ctx.fillStyle = "red";
                    ctx.textAlign = "center";
                    ctx.font = "20px " + FONT;
                    ctx.fillText(CURRENT_LANGUAGE.title.connectedToServer, c.width/2, 30);
                    // this.scene = 1;
                }
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
            case 9: //profile page
                this.drawProfilePage();
                break;
            case 10: //leaderboard page
                this.drawLeaderboardPage();
                break;
            case 11: //accessiblity settings page
                this.drawAccessSettingsPage();
                break;
        }

        //tell user if they are connected to server
        

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

        this.camera.drawTransition();
    }

    drawTitleScreen() {
        //background
        // ctx.fillStyle = "black";
        // ctx.fillRect(0,0,c.width,c.height);
        
        this.maps.drawTransition(true);
        //draw title text
        // ctx.fillStyle = "white";
        // ctx.textAlign = "center";
        // ctx.font = "100px Arial";
        // ctx.fillText("Elemental 4", c.width/2, c.height/2-200);
        
        // play button
        this.playButton.draw(dt,mouseX,mouseY);

        //logged in as text
        ctx.textAlign = "left";
        ctx.font = "30px "+FONT;
        ctx.fillStyle = "black";
        ctx.fillText(CURRENT_LANGUAGE.title.loggedInAs + " " + game.myData.gamerTag, 52, 52);
        ctx.fillStyle = "white";
        ctx.fillText(CURRENT_LANGUAGE.title.loggedInAs + " " + game.myData.gamerTag, 50, 50);

        ctx.textAlign = "center";
        ctx.font = "30px "+FONT;
        ctx.fillStyle = "black";
        ctx.fillText("©Cybercloud Studios", c.width/2+2, c.height-48);
        ctx.fillStyle = "white";
        ctx.fillText("©Cybercloud Studios", c.width/2, c.height-50);

        //logout
        this.logoutButton.draw(dt, mouseX, mouseY);
     
    }

    drawAccessSettingsPage() {
        this.maps.drawTransition(false);

        //this will be draw title text 
        ctx.font = "100px "+ FONT;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("Accessibility Options",c.width/2+4, 94);
        ctx.fillStyle = "white";
        ctx.fillText("Accessibility Options",c.width/2, 90);

        //panel
        this.settingsButtons.panel.draw();

        //contrast
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        
        ctx.font = "30px " + FONT;
        ctx.fillText("Contrast: ", 100, 250);
        
        ctx.textAlign = "center";
        ctx.font = "50px " + FONT;
        ctx.fillText(SETTINGS.contrast, 600, 270);
        this.accessPageContrastAddButton.draw(dt, mouseX, mouseY);
        this.accessPageContrastSubtractButton.draw(dt, mouseX, mouseY);
        
        //color blindness
        ctx.font = "30px " + FONT;
        ctx.textAlign = "left";
        ctx.fillText("Color Blindness: ", 100, 450);
        this.accessPageColorBlindnessNoneButton.draw(dt, mouseX, mouseY);
        this.accessPageColorBlindness1Button.draw(dt, mouseX, mouseY);
        this.accessPageColorBlindness2Button.draw(dt, mouseX, mouseY);
        this.accessPageColorBlindness3Button.draw(dt, mouseX, mouseY);
        
        //language
        ctx.font = "30px " + FONT;
        ctx.textAlign = "left";
        ctx.fillText("Language: ", 100, 650);
        this.accessPageLanguage1.draw(dt, mouseX, mouseY);
        this.accessPageLanguage2.draw(dt, mouseX, mouseY);
        this.accessPageLanguage3.draw(dt, mouseX, mouseY);
        this.accessPageLanguage4.draw(dt, mouseX, mouseY);
        this.accessPageLanguage5.draw(dt, mouseX, mouseY);
        this.accessPageLanguage6.draw(dt, mouseX, mouseY);

        //back button
        this.accessPageBackButton.draw(dt, mouseX, mouseY);

    }

    drawSettings() {
        // ctx.fillStyle = "black";
        // ctx.fillRect (0,0,c.width, c.height);
        this.maps.drawTransition(false);

        //this will be draw title text 
        ctx.font = "100px "+ FONT;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("Settings",c.width/2+4, 94);
        ctx.fillStyle = "white";
        ctx.fillText("Settings",c.width/2, 90);

        this.settingsButtons.panel.draw();

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        
        ctx.font = "60px " + FONT;
        ctx.fillText("Graphics", 100, 200);
        
        ctx.font = "30px " + FONT;
        ctx.fillText("Frame Rate: ", 100, 200+50);
        this.settingsButtons.frameRate30FPS.draw(dt, mouseX, mouseY);
        this.settingsButtons.frameRate60FPS.draw(dt, mouseX, mouseY);
        
        ctx.font = "30px " + FONT;
        ctx.textAlign = "left";
        ctx.fillText("Wind Particles: ", 100, 300+20+50);
        this.settingsButtons.windParticlesOn.draw(dt, mouseX, mouseY);
        this.settingsButtons.windParticlesOff.draw(dt, mouseX, mouseY);
        
        ctx.font = "30px " + FONT;
        ctx.textAlign = "left";
        ctx.fillText("Debris Particles: ", 100, 400+40+50);
        this.settingsButtons.debrisParticlesOn.draw(dt, mouseX, mouseY);
        this.settingsButtons.debrisParticlesOff.draw(dt, mouseX, mouseY);
        
        ctx.font = "30px " + FONT;
        ctx.textAlign = "left";
        ctx.fillText("Moving Background: ", 100, 500+60+50);
        this.settingsButtons.movingBackgroundOn.draw(dt, mouseX, mouseY);
        this.settingsButtons.movingBackgroundOff.draw(dt, mouseX, mouseY);
        
        ctx.font = "30px " + FONT;
        ctx.textAlign = "left";
        ctx.fillText("Text Indicators: ", 100, 600+80+50);
        this.settingsButtons.textIndicatorsOn.draw(dt, mouseX, mouseY);
        this.settingsButtons.textIndicatorsOff.draw(dt, mouseX, mouseY);
        
        ctx.font = "30px " + FONT;
        ctx.textAlign = "left";
        ctx.fillText("Fullscreen: ", 100, 700+100+50);
        this.settingsButtons.fullscreenOn.draw(dt, mouseX, mouseY);
        this.settingsButtons.fullscreenOff.draw(dt, mouseX, mouseY);
        
        this.settingsButtons.gameCredits.draw(dt, mouseX, mouseY);
        this.settingsButtons.accessFeatures.draw(dt, mouseX, mouseY);
        this.settingsButtons.backButton.draw(dt, mouseX, mouseY);

        ctx.beginPath();
        ctx.moveTo(1250, 200);
        ctx.lineTo(1250, 900);
        ctx.strokeStyle = "rgb(150,150,150)";
        ctx.lineWidth = "4px";
        ctx.stroke();

        //button section for settings
        // this.settingBackButton.draw (dt,mouseX, mouseY);
        // this.settingCreditButton.draw(dt,mouseX, mouseY);
        // this.settingsFullScreenButton.draw(dt,mouseX, mouseY);
    }

    
    drawCredits(){
        this.credits.draw();
        // ctx.fillStyle = "black";
        // ctx.fillRect (0,0,c.width, c.height);
        
        // //this will draw the credit title screen.
        // ctx.fillStyle= "Blue";
        // ctx.font = "100px Arial";
        // ctx.textAlign = "center";
        // ctx.fillText("CyberCloud Studios",c.width/2, 200);

        // //button section for credits
        // this.creditBackButton.draw (dt,mouseX, mouseY);

        // //This will be the actual credits
       
        // ctx.fillStyle= "white";
        // ctx.font = "30px Arial";
        // ctx.textAlign = "center";

        // ctx.fillText("Ice, Lava and Air Background",c.width/2, 275);

        // ctx.font = "15px Arial";
        // ctx.fillText("Glacial Mountains: Parallax Background by Vicente Nitti (www.vnitti.itch.io)",c.width/2, 340);
        // ctx.fillText("Licensed under Creative Commons: By Attribution 4.0 License",c.width/2, 380);
        // ctx.fillText("http://creativecommons.org/licenses/by/4.0/",c.width/2, 420);
        // ctx.fillText("Parts of this work was remixed.",c.width/2, 460);

        // ctx.font = "30px Arial";
        // ctx.fillText("Earth Background",c.width/2, 595);

        // ctx.font = "15px Arial";
        // ctx.fillText("Grassy Mountains: Parallax Background by Vicente Nitti (www.vnitti.itch.io)",c.width/2, 660);
        // ctx.fillText("Licensed under Creative Commons: By Attribution 4.0 License",c.width/2, 700);
        // ctx.fillText("http://creativecommons.org/licenses/by/4.0/",c.width/2, 740);
        // ctx.fillText("Parts of this work was remixed.",c.width/2, 780);

        // ctx.font = "30px Arial";
        // ctx.fillText("Wizard Character",c.width/2-700, 275);

        // ctx.font = "15px Arial";
        // ctx.fillText("Wizard Pack by LuizMelo (www.luizmelo.itch.io)",c.width/2-700, 340);
        // ctx.fillText("Licensed under Creative Commons Zero v1.0 Universal",c.width/2-700, 380);
        // ctx.fillText("https://creativecommons.org/publicdomain/zero/1.0/",c.width/2-700, 420);
        // ctx.fillText("Parts of this work was remixed.",c.width/2-700, 460);


        //////////////////////
        //   Game Credits   // 
        //////////////////////

//      Cybercloud Studios
     
//      Ice, Lava and Air Background
//      Glacial Mountains: Parallax Background by Vicente Nitti (www.vnitti.itch.io)
//      Licensed under Creative Commons: By Attribution 4.0 License
//      http://creativecommons.org/licenses/by/4.0/
//      Parts of this work was remixed.
     
//      Earth Background
//      Grassy Mountains: Parallax Background by Vicente Nitti (www.vnitti.itch.io)
//      Licensed under Creative Commons: By Attribution 4.0 License
//      http://creativecommons.org/licenses/by/4.0/
//      Parts of this work was remixed.
     
//      Fire Character
//      Grassy Mountains: Parallax Background by Chierit (www.chierit.itch.io)
//      Licensed under Creative Commons: By Attribution 4.0 License
//      http://creativecommons.org/licenses/by/4.0/
     
//      Water Character
//      Grassy Mountains: Parallax Background by Chierit (www.chierit.itch.io)
//      Licensed under Creative Commons: By Attribution 4.0 License
//      http://creativecommons.org/licenses/by/4.0/
     
//      Earth Character
//      Grassy Mountains: Parallax Background by Chierit (www.chierit.itch.io)
//      Licensed under Creative Commons: By Attribution 4.0 License
//      http://creativecommons.org/licenses/by/4.0/
     
//      Air Character
//      Grassy Mountains: Parallax Background by Chierit (www.chierit.itch.io)
//      Licensed under Creative Commons: By Attribution 4.0 License
//      http://creativecommons.org/licenses/by/4.0/
    }
    
    drawMenu() {
        // ctx.fillStyle = "black";
        // ctx.fillRect (0,0,c.width, c.height);
        this.maps.drawTransition(false);

        ctx.drawImage(allCharacters, 0,0,c.width,c.height);
        //ctx.drawImage(rocks, 0, 0);
        // this.backgroundCharacters.fire.draw();
        // this.backgroundCharacters.water.draw();
        
        // ctx.save();
        // ctx.scale(-1,1);
        // this.backgroundCharacters.earth.draw();
        // this.backgroundCharacters.air.draw();
        // ctx.restore();

        //this will draw the Menu screen text.
        ctx.font = "100px "+FONT;
        ctx.textAlign = "center";
        ctx.fillStyle= "black";
        ctx.fillText("Main Menu",c.width/2+4, 204);
        ctx.fillStyle= "white";
        ctx.fillText("Main Menu",c.width/2, 200);

        if (this.matchmaking) {
            ctx.font = "70px "+FONT;
            ctx.fillStyle = "black";
            ctx.fillText("Searching For Match", c.width/2+4, c.height/2-196);
            ctx.fillStyle = "white";
            ctx.fillText("Searching For Match", c.width/2, c.height/2-200);
            this.stopMatchmakeButton.draw(dt, mouseX, mouseY);
        } else {
            this.rankedMatchmakeButton.draw(dt, mouseX, mouseY);
            this.matchmakeButton.draw(dt, mouseX, mouseY);
            this.perkScreenButton.draw(dt,mouseX,mouseY);
            this.settingsButton.draw(dt,mouseX,mouseY);
            this.leaderboardButton.draw(dt,mouseX,mouseY);
        }

        this.menuBackButton.draw(dt,mouseX,mouseY);
        this.projectWebsiteButton.draw(dt,mouseX,mouseY);
        this.profilePageButton.draw(dt,mouseX,mouseY);
        
    }

    drawPerkScreen() {
        this.maps.drawTransition(false);

        //panel
        this.perkPanel.draw();

        //this will draw the Perk screen text
        ctx.font = "100px "+FONT;
        ctx.textAlign = "center";
        ctx.fillStyle= "black";
        ctx.fillText("Perk Screen",c.width/2+4, 114);
        ctx.fillStyle= "white";
        ctx.fillText("Perk Screen",c.width/2, 110);
       
        //Back button
        this.perkBackButton.draw(dt,mouseX,mouseY);

        //Perks buttons
        this.perkButtons.forEach(b => {
            b.draw(dt,mouseX,mouseY);
        });
        
        //Perk information title
        ctx.fillStyle ="white";
        ctx.textAlign ="center";
        ctx.font = "30px "+FONT;

        // ctx.fillText("Damage Boost",192,200);
        // ctx.fillText("Starting Health",507,200);
        // ctx.fillText("Critical Damage",822,200);
        // ctx.fillText("Critcal Hit Chance",1137,200);

        ctx.fillStyle = "black";
        ctx.fillText("Perk Information", 1599,200);
        ctx.fillText("Skill Points Available", 1452,633);
        ctx.fillText("Skill Progress", 1746,633);
        ctx.fillText(perkCount + "/9", 1746,860);

        ctx.font = "180px "+FONT;
        ctx.fillText(game.myData.perkPoints, 1452,815);

        //perk description
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "25px "+FONT;
        ctx.fillText(this.perkDescription[this.selectedPerk].string, 1599,240);
        if (this.perkDescription[this.selectedPerk].string2 != undefined) ctx.fillText(this.perkDescription[this.selectedPerk].string2, 1599,265);

        ctx.fillStyle = "black";
        ctx.fillRect(this.perkPanel.x, 275, this.perkPanel.w, 5);
        ctx.fillRect(this.perkPanel.x, 595, this.perkPanel.w, 5);
        ctx.fillRect(this.perkPanel.x+(this.perkPanel.w/2), 595, 4, 320);

        //perk progress
        ctx.strokeStyle = "black";
        // ctx.lineWidth = 20;
        // ctx.arc(this.perkPanel.x + (this.perkPanel.w/2), 1452, 100, 0, progressAngle)
        // ctx.stroke();
        
        ctx.font = "140px "+FONT;
        ctx.textAlign = "center";
        ctx.fillText(Math.floor(perkCount/9*100) + "%", this.perkPanel.x + this.perkPanel.w/4*3, 800);

        //perk price
        ctx.font = "30px "+FONT;
        ctx.fillText("Price", 1599,310);
        ctx.font = "100px "+FONT;
        ctx.fillText(this.perkDescription[this.selectedPerk].price, 1599,380);

        //Buy button
        this.perkBuyButton.draw(dt,mouseX,mouseY);
        this.perkActivateButton.draw(dt,mouseX,mouseY);

        //confirm window
        if (this.perkConfirmWindow) {
            this.perkConfirmPanel.draw();            

            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "60px "+FONT;
            ctx.fillText("Are you sure?", c.width/2, c.height/2-200);

            this.perkConfirmConfirmButton.draw(dt, mouseX, mouseY);
            this.perkConfirmCancelButton.draw(dt, mouseX, mouseY);
        }
    }
    

    drawPickCharacter() {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,c.width, c.height);

        ctx.fillStyle= "white";
        ctx.font = "80px "+FONT;
        ctx.textAlign = "center";
        ctx.fillText("Pick your character",c.width/2, 150);

        
        this.characterSelect.fire.draw(dt, mouseX, mouseY);
        this.characterSelect.water.draw(dt, mouseX, mouseY);
        this.characterSelect.earth.draw(dt, mouseX, mouseY);
        this.characterSelect.air.draw(dt, mouseX, mouseY);

        ctx.drawImage(fireCharacter,  c.width/2-150-720, 300, 300, 300);
        ctx.drawImage(waterCharacter, c.width/2-150-240, 300, 300, 300);
        ctx.drawImage(earthCharacter, c.width/2-150+240, 300, 300, 300);
        ctx.drawImage(airCharacter,   c.width/2-150+720, 300, 300, 300);

        ctx.fillStyle = "black";
        ctx.font = "40px "+FONT;
        ctx.textAlign = "center";
        ctx.fillText("Fire",  c.width/2-720, 700);
        ctx.fillText("Water", c.width/2-240, 700);
        ctx.fillText("Earth", c.width/2+240, 700);
        ctx.fillText("Air",   c.width/2+720, 700);
    }

    drawGame() {
        //background
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,c.width,c.height);

        //maps
        this.maps.drawNormal(game.map-1);

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
        ctx.font = "50px "+FONT;
        // ctx.strokeText("Player " + game.whichPlayerAmI, c.width/2, 100);
        // ctx.fillText("Player " + game.whichPlayerAmI, c.width/2, 100);

        if (game.turn && (this.player1Animator.currentAnimation == "idle" && this.player2Animator.currentAnimation == "idle")) {
            ctx.fillStyle = "black";
            ctx.fillText("Your Turn!", c.width/2+4, 204);
            ctx.fillStyle = "white";
            ctx.fillText("Your Turn!", c.width/2, 200);

            if (game.points >= 6 && !(game.health >= 200)) {
                this.actionButtons.heal.style = "normal";
                this.actionButtons.heal.draw(dt, mouseX, mouseY);
                ctx.drawImage(icons, 160,0,40,40, 336+50+148+10,900+70,70,70); //h
            } else {
                this.actionButtons.heal.style = "disabled";
                this.actionButtons.heal.draw(dt, mouseX, mouseY);
                ctx.drawImage(icons, 160,40,40,40, 336+50+148+10,900+70,70,70); //h
            }
            
            if (game.points >= 3) {
                this.actionButtons.attack1.style = "normal";
                this.actionButtons.attack1.draw(dt, mouseX, mouseY);
                ctx.drawImage(icons, 0,0,40,40, 652+50+148+10, 900+70,70,70); //a1
            } else {
                this.actionButtons.attack1.style = "disabled";
                this.actionButtons.attack1.draw(dt, mouseX, mouseY);
                ctx.drawImage(icons, 0,40,40,40, 652+50+148+10, 900+70,70,70); //a1
            }
            
            if (game.points >= 4) {
                this.actionButtons.attack2.style = "normal";
                this.actionButtons.attack2.draw(dt, mouseX, mouseY);
                ctx.drawImage(icons, 40,0,40,40, 968+50+148+10, 900+70,70,70); //a2
            } else {
                this.actionButtons.attack2.style = "disabled";
                this.actionButtons.attack2.draw(dt, mouseX, mouseY);
                ctx.drawImage(icons, 40,40,40,40, 968+50+148+10, 900+70,70,70); //a2
            }

            if (game.points >= 5) {
                this.actionButtons.attack3.style = "normal";
                this.actionButtons.attack3.draw(dt, mouseX, mouseY);
                ctx.drawImage(icons, 80,0,40,40, 1284+50+148+10, 900+70,70,70); //a3
            } else {
                this.actionButtons.attack3.style = "disabled";
                this.actionButtons.attack3.draw(dt, mouseX, mouseY);
                ctx.drawImage(icons, 80,40,40,40, 1284+50+148+10, 900+70,70,70); //a3
            }
            
            if (game.points >= 15) {
                this.actionButtons.ultimate.style = "normal";
                this.actionButtons.ultimate.draw(dt, mouseX, mouseY);
                ctx.drawImage(icons, 120,0,40,40, 1600+50+148+10,900+70,70,70); //u
            } else {
                this.actionButtons.ultimate.style = "disabled";
                this.actionButtons.ultimate.draw(dt, mouseX, mouseY);
                ctx.drawImage(icons, 120,40,40,40, 1600+50+148+10,900+70,70,70); //u
            }

            this.actionButtons.wait.draw(dt, mouseX, mouseY);

            //perk button
            let havePerk = game.myData.perksUnlocked.split(",");
            if (game.perkBarValue >= 100 && havePerk.includes("2")) {
                this.perkActivationButton.draw(dt, mouseX, mouseY);
            }

            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "30px "+FONT;
            ctx.fillText("Wait", 20+148, 900);
            ctx.fillText("Heal",336+148, 900);
            ctx.fillText("Attack 1",652+148, 900);
            ctx.fillText("Attack 2",968+148, 900);
            ctx.fillText("Attack 3",1284+148, 900);
            ctx.fillText("Ultimate",1600+148, 900);
            
            
            ctx.font = "20px "+FONT;
            ctx.fillText("Price: 0", 20+148, 950);
            ctx.fillText("Price: 6",336+148, 950);
            ctx.fillText("Price: 3",652+148, 950);
            ctx.fillText("Price: 4",968+148, 950);
            ctx.fillText("Price: 5",1284+148, 950);
            ctx.fillText("Price: 15",1600+148, 950);

            let damageBoost = 0;
            // switch(parseInt(game.myData.perksUnlocked.split(",")[0])) {
            //     case 0: damageBoost = 0; break;
            //     case 1: damageBoost = 5; break;
            //     case 2: damageBoost = 10; break;
            //     case 3: damageBoost = 15; break;
            //     case 4: damageBoost = 20; break;
            // }

            ctx.fillText("10 Health, 2 points", 20+148, 1000);
            ctx.fillText("30 Health",336+148, 1000);
            ctx.fillText(10 + " Damage",652+148, 1000);
            ctx.fillText(20 + " Damage",968+148, 1000);
            ctx.fillText(30 + " Damage",1284+148, 1000);
            ctx.fillText(70 + " Damage",1600+148, 1000);
            
            if (game.attackButtonsDisabled) {
                /////draw X's
            }

        }

        if (game.showPerkActivated.toggle) {
            ctx.textAlign = "center";
            ctx.font = "100px " + FONT;
            ctx.fillStyle = "black";
            ctx.fillText(game.showPerkActivated.gamertag + " has activated their perk!",c.width/2+4, c.height/2+4)
            ctx.fillText(game.showPerkActivated.perk,c.width/2+4, c.height/2+100+4);
            ctx.fillStyle = "white";
            ctx.fillText(game.showPerkActivated.gamertag + " has activated their perk!",c.width/2, c.height/2)
            ctx.fillText(game.showPerkActivated.perk,c.width/2, c.height/2+100);
        }

        ctx.font = "70px " + FONT;
        ctx.textAlign = "center";
        let min = Math.floor(matchTimer/60000);
        let sec = Math.floor(matchTimer/1000) % 60;
        min = (min <= 9) ? "0" + min : min;
        sec = (sec <= 9) ? "0" + sec : sec;
        ctx.fillStyle = "black";
        ctx.fillText(min + ":" + sec, c.width/2+4, 104);
        ctx.fillStyle = "white";
        ctx.fillText(min + ":" + sec, c.width/2, 100);
        matchTimer += dt;

        ctx.textAlign = "left";
        ctx.font = "40px "+FONT;
        ctx.fillStyle = "black";
        ctx.fillText("health: " + game.health, 52, 202);
        ctx.fillText("Perk Stamina: " + game.perkBarValue, 52, 252);
        ctx.fillText("points: " + game.points, 52, 302);
        ctx.fillStyle = "white";
        ctx.fillText("health: " + game.health, 50, 200);
        ctx.fillText("Perk Stamina: " + game.perkBarValue, 50, 250);
        ctx.fillText("points: " + game.points, 50, 300);
        

        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.fillText("health: " + game.player2.health, c.width-48, 202);
        ctx.fillText("Perk Stamina: " + game.player2.perkBarValue, c.width-48, 252);
        ctx.fillText("points: " + game.player2.points, c.width-48, 302);
        ctx.fillStyle = "white";
        ctx.fillText("health: " + game.player2.health, c.width-50, 200);
        ctx.fillText("Perk Stamina: " + game.player2.perkBarValue, c.width-50, 250);
        ctx.fillText("points: " + game.player2.points, c.width-50, 300);
        
        
        ctx.textAlign = "left";
        ctx.font = "60px "+FONT;
        ctx.fillStyle = "black";
        if (game.ranked) ctx.fillText(game.myData.gamerTag + " [" + this.ranks[(Math.floor(game.myData.skillLevel/100) >= 5) ? 4 : (Math.floor(game.myData.skillLevel/100))] + "]", 54, 104);
        if (!game.ranked) ctx.fillText(game.myData.gamerTag + " [" + (game.myData.nextLevel-1000 + game.myData.xpLevel + "xp") + "]", 54, 104);
        ctx.fillStyle = "white";
        if (game.ranked) ctx.fillText(game.myData.gamerTag + " [" + this.ranks[(Math.floor(game.myData.skillLevel/100) >= 5) ? 4 : (Math.floor(game.myData.skillLevel/100))] + "]", 50, 100);
        if (!game.ranked) ctx.fillText(game.myData.gamerTag + " [" + (game.myData.nextLevel-1000 + game.myData.xpLevel + "xp") + "]", 50, 100);
        
        ctx.textAlign = "right";        
        ctx.fillStyle = "black";
        if (game.ranked) ctx.fillText(game.player2.gamerTag + " [" + this.ranks[(Math.floor(game.player2.skillLevel/100) >= 5) ? 4 : (Math.floor(game.player2.skillLevel/100))] + "]",c.width -48, 104);
        if (!game.ranked) ctx.fillText(game.player2.gamerTag + " [" + (game.player2.nextLevel-1000 + game.player2.xpLevel + "xp") + "]",c.width -48, 104);
        ctx.fillStyle = "white";
        if (game.ranked) ctx.fillText(game.player2.gamerTag + " [" + this.ranks[(Math.floor(game.player2.skillLevel/100) >= 5) ? 4 : (Math.floor(game.player2.skillLevel/100))] + "]",c.width -50, 100);
        if (!game.ranked) ctx.fillText(game.player2.gamerTag + " [" + (game.player2.nextLevel-1000 + game.player2.xpLevel + "xp") + "]",c.width -50, 100);


        this.indicators.draw();

        if (game.over) {
            ctx.textAlign = "center";
            ctx.font = "100px "+FONT;
            if (game.win) {
                ctx.fillStyle = "rgba(0,255,100,0.3)";
                ctx.fillRect(0,0,c.width,c.height);
                ctx.fillStyle = "black";
                ctx.fillText("Victory", c.width/2+4,c.height/2+4);
                ctx.fillStyle = "white";
                ctx.fillText("Victory", c.width/2,c.height/2);
            } else {
                ctx.fillStyle = "rgba(255,0,0,0.3)";
                ctx.fillRect(0,0,c.width,c.height);
                ctx.fillStyle = "black";
                ctx.fillText("Defeat", c.width/2+4,c.height/2+4);
                ctx.fillStyle = "white";
                ctx.fillText("Defeat", c.width/2,c.height/2);
            }
        }

        //healthbar
        this.player1HealthBar.draw();
        this.player1PerkBar.draw();

        if (!roundIndicator) {
            roundIndicator = true;
            if (game.health <= 40) {
                this.indicators.makeIndicator("+2 Points", 500,c.height/2, "rgba(0,255,100,");
            } else {
                this.indicators.makeIndicator("+3 Points", 500,c.height/2, "rgba(0,255,100,");
            }

            if (game.player2.health <= 40) {
                this.indicators.makeIndicator("+2 Points", 1500,c.height/2, "rgba(0,255,100,");
            } else {
                this.indicators.makeIndicator("+3 Points", 1500,c.height/2, "rgba(0,255,100,");
            }
        }

        ctx.save();
        ctx.scale(-1,1);
        this.player2HealthBar.draw();
        this.player2PerkBar.draw();
        ctx.restore();
    }
    drawGameResults() {
        //background
        switch(whatMapWasIt-1) {
            case 0: ctx.drawImage(waterMapBlur, 0,0,c.width,c.height); break;
            case 1: ctx.drawImage(fireMapBlur, 0,0,c.width,c.height); break;
            case 2: ctx.drawImage(earthMapBlur, 0,0,c.width,c.height); break;
            case 3: ctx.drawImage(airMapBlur, 0,0,c.width,c.height); break;
        }
        //this will draw the Game results screen text
        ctx.font = "100px "+FONT;
        ctx.textAlign = "center";
        ctx.fillStyle= "black";
        ctx.fillText("Game Results",c.width/2+4, 204);
        ctx.fillStyle= "white";
        ctx.fillText("Game Results",c.width/2, 200);
 
        // ctx.textAlign = "center";
        // ctx.font = "100px Arial";
        // if (game.win) {
        //     ctx.fillStyle = "lime";
        //     ctx.fillText("You Win!", c.width/2,c.height/2);
        // } else {
        //     ctx.fillStyle = "red";
        //     ctx.fillText("You Lose!", c.width/2,c.height/2);
        // }

        this.resultsPanel.draw();
        if (game.ranked) this.resultsPanel2.draw(); else this.resultsPanel.draw();

        switch(whatCharacterWasI) {
            case 0: ctx.drawImage(fireCharacter, c.width/2-200, c.height/2-300, 400, 400); break;
            case 1: ctx.drawImage(waterCharacter, c.width/2-200, c.height/2-300, 400, 400); break;
            case 2: ctx.drawImage(earthCharacter, c.width/2-200, c.height/2-300, 400, 400); break;
            case 3: ctx.drawImage(airCharacter, c.width/2-200, c.height/2-300, 400, 400); break;
        }

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.font = "30px "+FONT;
        ctx.fillText("XP: " + (Math.floor(this.xpHealthBar.value*100)) + "/" + (this.xpHealthBar.maxValue*100), c.width/2-450, c.height/2+150);
        // ctx.fillText("XP Needed for Next Level: "+ (this.xpHealthBar.maxValue*100)+"xp", c.width/2+350, c.height/2-100);
        
        ctx.textAlign = "center";
        ctx.fillText("+"+game.xpGain+"xp", c.width/2, c.height/2+250);
        
        ctx.font = "50px "+FONT;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";

        if (game.levelUp) {
            ctx.fillText("Level Up!", c.width/2, c.height/2+150);
        } else {
            ctx.fillText("Level " + ((this.xpHealthBar.maxValue/10)-1) , c.width/2, c.height/2+150);
        }

        this.xpHealthBar.draw();
        if (game.ranked) {
            this.skillLevelHealthBar.draw();
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "30px "+FONT;
            // ctx.fillText("Current Rank: " + this.ranks[((Math.floor(game.myData.skillLevel/100) >= 5) ? 4 : Math.floor(game.myData.skillLevel/100))] + " " + Math.floor(this.skillLevelHealthBar.value) + "/" + this.skillLevelHealthBar.maxValue + " -> Next Rank: " + this.ranks[(Math.floor((game.myData.skillLevel/100)+1) >= 5) ? 4 : Math.floor((game.myData.skillLevel/100)+1)], c.width/2, c.height/2+350);
            ctx.fillText(Math.floor(this.skillLevelHealthBar.value) + "/" + this.skillLevelHealthBar.maxValue, c.width/2, c.height/2+350);
            ctx.textAlign = "left"
            ctx.fillText("Current Rank: " + this.ranks[((Math.floor(game.myData.skillLevel/100) >= 5) ? 4 : Math.floor(game.myData.skillLevel/100))], this.skillLevelHealthBar.x, c.height/2+350);
            ctx.textAlign = "right"
            ctx.fillText(skillLevelGain, this.skillLevelHealthBar.x + this.skillLevelHealthBar.w, c.height/2+350);
        }
        this.resultsBackButton.draw(dt,mouseX,mouseY);
    }

    drawProfilePage(){
        // ctx.fillStyle = "black";
        // ctx.fillRect (0,0,c.width, c.height);
        this.maps.drawTransition(false);

        //this will be draw title text 
        ctx.font = "100px "+ FONT;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("Profile",c.width/2+4, 94);
        ctx.fillStyle = "white";
        ctx.fillText("Profile",c.width/2, 90);

        this.profilePagePanel.draw();

        ctx.fillStyle = "black";
        ctx.font = "100px "+ FONT;
        ctx.textAlign = "center";
        ctx.fillText(game.myData.gamerTag,c.width/2, 250);
        ctx.textAlign = "left";

        ctx.font = "50px "+ FONT;
        ctx.fillText("XP Level: " + game.myData.xpLevel,c.width/2-200, 350);
        ctx.fillText("Rank: " + this.ranks[(Math.floor(game.myData.skillLevel/100)>= 5)? 4:Math.floor(game.myData.skillLevel/100)],c.width/2-200, 420);
        ctx.fillText("Skill Level: " + game.myData.skillLevel + "sr",c.width/2-200, 490);
        ctx.fillText("Games Won: " + game.myData.gamesWon,c.width/2-200, 560);
        ctx.fillText("Games Lost: " + game.myData.gamesLost,c.width/2-200, 630);
        ctx.fillText("Games Played: " + (game.myData.gamesWon + game.myData.gamesLost),c.width/2-200, 700);

        this.profileBackButton.draw(dt,mouseX,mouseY);
        

    }

    drawLeaderboardPage(){
        this.maps.drawTransition(false);

        //this will be draw title text 
        ctx.font = "100px "+ FONT;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("Leaderboard",c.width/2+4, 94);
        ctx.fillStyle = "white";
        ctx.fillText("Leaderboard",c.width/2, 90);

        this.leaderboardPanel1.draw()

        this.leaderboardPanel2.draw()

        this.leaderboardPanel3.draw()

        ctx.font = "50px "+ FONT;
        ctx.fillStyle = "black";
        
        for(let i = 0; i < 10; i++){
            ctx.textAlign = "left";
            ctx.fillText(this.leaderboard1[i].gamertag, this.leaderboardPanel1.x + 20, 300 + i * 50);
            ctx.fillText(this.leaderboard2[i].gamertag, this.leaderboardPanel2.x + 20,300 + i * 50);
            ctx.fillText(this.leaderboard3[i].gamertag, this.leaderboardPanel3.x + 20,300 + i * 50);
            
            ctx.textAlign = "right";
            ctx.fillText(this.leaderboard1[i].data,this.leaderboardPanel1.x + this.leaderboardPanel1.w - 20, 300 + i * 50);
            ctx.fillText(this.leaderboard2[i].data,this.leaderboardPanel2.x + this.leaderboardPanel2.w - 20, 300 + i * 50);
            ctx.fillText(this.leaderboard3[i].data,this.leaderboardPanel3.x + this.leaderboardPanel3.w - 20, 300 + i * 50);
        }
        
        ctx.textAlign = "center";
        ctx.fillText("Most Games Won",this.leaderboardPanel1.x + this.leaderboardPanel1.w/2,210);
        ctx.fillText("Top 10 Warriors",this.leaderboardPanel2.x + this.leaderboardPanel2.w/2,210);
        ctx.fillText("Most XP collected",this.leaderboardPanel3.x + this.leaderboardPanel3.w/2,210);

        ctx.strokeStyle = "black";
        ctx.lineWidth = "15px";
        ctx.beginPath();
        ctx.moveTo(this.leaderboardPanel1.x,230);       
        ctx.lineTo(this.leaderboardPanel1.x + this.leaderboardPanel1.w, 230);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.leaderboardPanel2.x,230);       
        ctx.lineTo(this.leaderboardPanel2.x + this.leaderboardPanel2.w, 230);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.leaderboardPanel3.x,230);       
        ctx.lineTo(this.leaderboardPanel3.x + this.leaderboardPanel3.w, 230);
        ctx.stroke();

        this.leaderboardBackButton.draw(dt,mouseX,mouseY);
        
    }

    mouseClick() {
        switch(this.scene) {
            case 1: //title screen
                if (this.playButton.mouseOver(mouseX,mouseY)) {
                    // this.scene = 4;
                    this.camera.transitionTo(4,0.005); 
                } else if (this.logoutButton.mouseOver(mouseX, mouseY)) {
                    logout();
                }
                break;
            case 2: //settings screen
                if (this.settingsButtons.backButton.mouseOver(mouseX, mouseY)) {
                    this.camera.transitionTo(4,0.005); 
                    break;
                } else if (this.settingsButtons.gameCredits.mouseOver(mouseX, mouseY)) {
                    this.credits = new Credits();      
                    this.camera.transitionTo(3,0.005);
                    break; 
                } else if (this.settingsButtons.accessFeatures.mouseOver(mouseX, mouseY)) {
                    loadAccessFeatures();
                    this.camera.transitionTo(11,0.005);
                    break; 
                }  else if (this.settingsButtons.frameRate30FPS.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.frameRate30FPS.style = "selected";
                    this.settingsButtons.frameRate60FPS.style = "disabled";
                    SETTINGS.frameRate = 30;
                    sessionStorage.setItem("frameRate", 30);
                    break;
                } else if (this.settingsButtons.frameRate60FPS.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.frameRate60FPS.style = "selected";
                    this.settingsButtons.frameRate30FPS.style = "disabled";
                    SETTINGS.frameRate = 60;
                    sessionStorage.setItem("frameRate", 60);
                    break;
                } else if (this.settingsButtons.windParticlesOn.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.windParticlesOn.style = "selected";
                    this.settingsButtons.windParticlesOff.style = "disabled";
                    SETTINGS.windParticles = true;
                    sessionStorage.setItem("windParticles", true);
                    break;
                } else if (this.settingsButtons.windParticlesOff.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.windParticlesOff.style = "selected";
                    this.settingsButtons.windParticlesOn.style = "disabled";
                    SETTINGS.windParticles = false;
                    sessionStorage.setItem("windParticles", false);
                    break;
                } else if (this.settingsButtons.debrisParticlesOn.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.debrisParticlesOn.style = "selected";
                    this.settingsButtons.debrisParticlesOff.style = "disabled";
                    SETTINGS.debrisParticles = true;
                    sessionStorage.setItem("debrisParticles", true);
                    break;
                } else if (this.settingsButtons.debrisParticlesOff.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.debrisParticlesOff.style = "selected";
                    this.settingsButtons.debrisParticlesOn.style = "disabled";
                    SETTINGS.debrisParticles = false;
                    sessionStorage.setItem("debrisParticles", false);
                    break;
                } else if (this.settingsButtons.movingBackgroundOn.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.movingBackgroundOn.style = "selected";
                    this.settingsButtons.movingBackgroundOff.style = "disabled";
                    SETTINGS.movingBackground = true;
                    sessionStorage.setItem("movingBackground", true);
                    break;
                } else if (this.settingsButtons.movingBackgroundOff.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.movingBackgroundOff.style = "selected";
                    this.settingsButtons.movingBackgroundOn.style = "disabled";
                    SETTINGS.movingBackground = false;
                    sessionStorage.setItem("movingBackground", false);
                    break;
                } else if (this.settingsButtons.textIndicatorsOn.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.textIndicatorsOn.style = "selected";
                    this.settingsButtons.textIndicatorsOff.style = "disabled";
                    SETTINGS.textIndicators = true;
                    sessionStorage.setItem("textIndicators", true);
                    break;
                } else if (this.settingsButtons.textIndicatorsOff.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.textIndicatorsOff.style = "selected";
                    this.settingsButtons.textIndicatorsOn.style = "disabled";
                    SETTINGS.textIndicators = false;
                    sessionStorage.setItem("textIndicators", false);
                    break;
                } else if (this.settingsButtons.fullscreenOn.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.fullscreenOn.style = "selected";
                    this.settingsButtons.fullscreenOff.style = "disabled";
                    SETTINGS.fullscreen = true;
                    document.getElementsByTagName("body")[0].requestFullscreen();
                    break;
                } else if (this.settingsButtons.fullscreenOff.mouseOver(mouseX, mouseY)) {
                    this.settingsButtons.fullscreenOff.style = "selected";
                    this.settingsButtons.fullscreenOn.style = "disabled";
                    SETTINGS.fullscreen = false;
                    document.exitFullscreen();
                    break;
                }

                // if(this.settingBackButton.mouseOver(mouseX,mouseY)) {
                //     this.camera.transitionTo(4,0.005); 
                // } else if (this.settingCreditBut ton.mouseOver(mouseX,mouseY)){    
                //     this.credits = new Credits();      
                //     this.camera.transitionTo(3,0.005); 
                // } else if(this.settingsFullScreenButton.mouseOver(mouseX,mouseY)) { 
                //     if (this.fullScreen) {
                //         document.exitFullscreen();
                //         this.fullScreen = false;
                //         this.settingsFullScreenButton.setText('FullScreen');
                //     }  else {
                //         c.requestFullscreen();
                //         this.fullScreen = true;
                //         this.settingsFullScreenButton.setText('Exit FullScreen');
                //     }
                // }
                // break;
            case 3: //credits screen
                if(this.creditBackButton.mouseOver(mouseX,mouseY)) {
                    this.camera.transitionTo(2,0.005); 
                }
                break;
            case 4: //menu screen
                if (this.matchmakeButton.mouseOver(mouseX, mouseY)) {
                    matchmake(false);
                } else if (this.rankedMatchmakeButton.mouseOver(mouseX, mouseY)) {
                    matchmake(true);
                    game.ranked = true;
                }else if (this.matchmaking && this.stopMatchmakeButton.mouseOver(mouseX, mouseY)) {
                    stopMatchmaking();
                } else if (this.perkScreenButton.mouseOver(mouseX,mouseY)){     
                    if (this.matchmaking) {
                        stopMatchmaking();
                    }     
                    updatePerkButtons();
                    this.perkButtons[0].style = "selected";
                    this.camera.transitionTo(5,0.005); 
                    break;

                } else if (this.settingsButton.mouseOver(mouseX,mouseY)) {
                    if (this.matchmaking) {
                        stopMatchmaking();
                    } 
                    this.camera.transitionTo(2,0.005); 
                    loadSettings();
                } else if (this.menuBackButton.mouseOver(mouseX,mouseY)) {
                    if (this.matchmaking) {
                        stopMatchmaking();
                    } 
                    this.camera.transitionTo(1,0.005); 
                } else if (this.projectWebsiteButton.mouseOver(mouseX,mouseY)) {
                    if (this.matchmaking) {
                        stopMatchmaking();
                    } 
                    location.href = "http://cybercloudstudios.co.uk"; 
                } else if (this.profilePageButton.mouseOver(mouseX,mouseY)) {
                    this.camera.transitionTo(9,0.005); 
                } else if (this.leaderboardButton.mouseOver(mouseX,mouseY)) {
                    this.camera.transitionTo(10,0.005); 
                    requestLeaderboard();
                }

                break;
            case 5: //perk screen
                if(this.perkBackButton.mouseOver(mouseX,mouseY)) {
                    this.camera.transitionTo(4,0.005); 
                    break;
                } else if (this.perkBuyButton.mouseOver(mouseX, mouseY)) {
                    if (game.myData.perkPoints >= this.perkDescription[this.selectedPerk].price) {
                        this.perkConfirmWindow = true;
                    }
                    break;
                } else if (this.perkConfirmWindow && this.perkConfirmCancelButton.mouseOver(mouseX, mouseY)) {
                    this.perkConfirmWindow = false;
                    break;
                } else if (this.perkConfirmWindow && this.perkConfirmConfirmButton.mouseOver(mouseX, mouseY)) {
                    //buy perk
                    buyPerk(this.selectedPerk);
                    break;
                } else if (this.perkActivateButton.mouseOver(mouseX, mouseY)) {
                    activatePerk(this.selectedPerk);
                }

                if (!this.perkConfirmWindow) {
                    for (let i= 0;i<this.perkButtons.length; i++){
                        if (this.perkButtons[i].mouseOver(mouseX,mouseY)){
                            this.selectedPerk = i;
                            updatePerkButtons();
                            this.perkButtons[i].style = "selected";
                            
                            break;
                        }
                    }
                }
                    
                break;
            case 6: //character select
                if (this.characterSelect.fire.mouseOver(mouseX,mouseY)) {
                    selectPlayer(0);
                    this.player1Animator = new Animator("fire", this.character1X,this.character1Y,this.characterWidth,this.characterHeight);
                    this.camera.transitionTo(7,0.005); 
                } else if (this.characterSelect.water.mouseOver(mouseX,mouseY)) {
                    selectPlayer(1);
                    this.player1Animator = new Animator("water",this.character1X,this.character1Y,this.characterWidth,this.characterHeight);
                    this.camera.transitionTo(7,0.005); 
                } else if (this.characterSelect.earth.mouseOver(mouseX,mouseY)) {
                    selectPlayer(2);
                    this.player1Animator = new Animator("earth",this.character1X-220,this.character1Y-270,this.characterWidth*1.4,this.characterHeight*1.4);
                    this.camera.transitionTo(7,0.005); 
                } else if (this.characterSelect.air.mouseOver(mouseX,mouseY)) {
                    selectPlayer(3);
                    this.player1Animator = new Animator("air",this.character1X,this.character1Y,this.characterWidth,this.characterHeight);
                    this.camera.transitionTo(7,0.005); 
                } 
                break;

            case 7: //game
                if (game.turn) {
                    if (this.actionButtons.wait.mouseOver(mouseX, mouseY)) {
                        action(0);
                    } else if (this.actionButtons.heal.mouseOver(mouseX, mouseY) && !game.attackButtonsDisabled) {
                        action(1);
                    } else if (this.actionButtons.attack1.mouseOver(mouseX, mouseY) && !game.attackButtonsDisabled) {
                        action(2);
                    } else if (this.actionButtons.attack2.mouseOver(mouseX, mouseY) && !game.attackButtonsDisabled) {
                        action(3);
                    } else if (this.actionButtons.attack3.mouseOver(mouseX, mouseY) && !game.attackButtonsDisabled) {
                        action(4);
                    } else if (this.actionButtons.ultimate.mouseOver(mouseX, mouseY) && !game.attackButtonsDisabled) {
                        action(5);
                    }else if (game.perkBarValue >= 100 && this.perkActivationButton.mouseOver(mouseX, mouseY)) {
                        usePerk();
                    }
                } 
                break;

            case 8://game results
                if (this.resultsBackButton.mouseOver(mouseX,mouseY)) {
                    this.camera.transitionTo(4,0.005); 
                    resetGame();
                }
                break;  
            
            case 9://profile page
                if(this.profileBackButton.mouseOver(mouseX,mouseY)) {
                    this.camera.transitionTo(4,0.005); 
                }
                break;

            case 10://leaderboard
                if(this.leaderboardBackButton.mouseOver(mouseX,mouseY)){
                    this.camera.transitionTo(4,0.005)
                }
                break;
            case 11: //accesibility page
                if (this.accessPageBackButton.mouseOver(mouseX, mouseY)) {
                    this.camera.transitionTo(2, 0.005);
                } else if (this.accessPageContrastAddButton.mouseOver(mouseX, mouseY)) {
                    SETTINGS.contrast = SETTINGS.contrast + 5;
                    if (SETTINGS.contrast >= 200) SETTINGS.contrast = 200;
                } else if (this.accessPageContrastSubtractButton.mouseOver(mouseX, mouseY)) {
                    SETTINGS.contrast = SETTINGS.contrast - 5;
                    if (SETTINGS.contrast <= 0) SETTINGS.contrast = 0;
                } else if (this.accessPageColorBlindnessNoneButton.mouseOver(mouseX,mouseY)) {
                    SETTINGS.colorBlindness = 0;
                    sessionStorage.setItem("colorBlindness", 0);
                    loadAccessFeatures();
                } else if (this.accessPageColorBlindness1Button.mouseOver(mouseX,mouseY)) {
                    SETTINGS.colorBlindness = 1;
                    sessionStorage.setItem("colorBlindness", 1);
                    loadAccessFeatures();
                } else if (this.accessPageColorBlindness2Button.mouseOver(mouseX,mouseY)) {
                    SETTINGS.colorBlindness = 2;
                    sessionStorage.setItem("colorBlindness", 2);
                    loadAccessFeatures();
                } else if (this.accessPageColorBlindness3Button.mouseOver(mouseX,mouseY)) {
                    SETTINGS.colorBlindness = 3;
                    sessionStorage.setItem("colorBlindness", 3);
                    loadAccessFeatures();
                } else if (this.accessPageLanguage1.mouseOver(mouseX,mouseY)) {
                    SETTINGS.language = 0;
                    sessionStorage.setItem("language", 0);
                    loadAccessFeatures();
                } else if (this.accessPageLanguage2.mouseOver(mouseX,mouseY)) {
                    SETTINGS.language = 1;
                    sessionStorage.setItem("language", 1);
                    loadAccessFeatures();
                } else if (this.accessPageLanguage3.mouseOver(mouseX,mouseY)) {
                    SETTINGS.language = 2;
                    sessionStorage.setItem("language", 2);
                    loadAccessFeatures();
                } else if (this.accessPageLanguage4.mouseOver(mouseX,mouseY)) {
                    SETTINGS.language = 3;
                    sessionStorage.setItem("language", 3);
                    loadAccessFeatures();
                } else if (this.accessPageLanguage5.mouseOver(mouseX,mouseY)) {
                    SETTINGS.language = 4;
                    sessionStorage.setItem("language", 4);
                    loadAccessFeatures();
                } else if (this.accessPageLanguage6.mouseOver(mouseX,mouseY)) {
                    SETTINGS.language = 5;
                    sessionStorage.setItem("language", 5);
                    loadAccessFeatures();
                }
                break;
        }
    }

    updateAllText() {
        this.playButton.text = CURRENT_LANGUAGE.title.playButton;
        this.logoutButton.text = CURRENT_LANGUAGE.title.logout;
    }
}