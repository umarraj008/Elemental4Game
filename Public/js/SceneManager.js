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
        this.cloudMoveSpeed = 0.1;
        this.titleCurrentMap = Math.floor(Math.random()*3)+1;
        this.titleMapTimer = 0;
        this.titleMapDuration = 5000;
        this.windParticleSystem = new WindParticleSystem();
        this.player1HealthBar = new HealthBar(50,120,700,30,0,200, false);
        this.player2HealthBar = new HealthBar(-(c.width-50), 120, 700, 30,0,200, false);
        this.xpHealthBar = new HealthBar(c.width/2-350, c.height/2, 700, 30, 0, 100, true);
        this.xpHealthBar.speed = 0.07;
        this.selectedPerk = 0;

        //title screen buttons
        this.playButton = new Button(c.width/2-150,c.height/2-75,300,150, "Play");
        
        //main menu buttons
        this.matchmakeButton =  new Button(c.width/2-600,c.height/2-100,300,150, "Matchmake");
        this.perkScreenButton = new Button(c.width/2-150,c.height/2-100,300,150, "Perk Screen");
        this.settingsButton = new Button(c.width/2+300,c.height/2-100,300,150, "Settings");
        this.menuBackButton = new Button(c.width/2-300,c.height/2+300,600,100, "Back");
        this.projectWebsiteButton = new Button(50,c.height-200,300,150, "Project Website");
        
        //settings buttons
        this.settingsFullScreenButton = new Button(c.width/2-150,c.height/2-200,300,150, "Fullscreen");
        this.settingCreditButton = new Button(c.width/2-150,c.height/2,300,150, "Credits");
        this.settingBackButton = new Button(c.width/2-300,c.height/2+300,600,100, "Back");
        
        //perk screen buttons
        this.perkBackButton = new Button(c.width/2-300,c.height/2+420,600,80,"Back");

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

        this.logoutButton = new Button(50, c.height-200,300,150, "Logout");

        this.perkButtons = [
            new Button(50,230,285,155,"+5 Damage", true),
            new Button(50,407,285,155,"+10 Damage", true),
            new Button(50,584,285,155,"+15 Damage", true),
            new Button(50,761,285,155,"+20 Damage", true),

            new Button(365,230,285,155,"+15 Health", true),
            new Button(365,407,285,155,"+30 Health", true),
            new Button(365,584,285,155,"+50 Health", true),
            new Button(365,761,285,155,"+70 Health", true),

            new Button(680,230,285,155,"x0.4 Critical Damage", true),
            new Button(680,407,285,155,"x0.6 Critical Damage", true),
            new Button(680,584,285,155,"x0.8 Critical Damage", true),
            new Button(680,761,285,155,"x1.0 Critical Damage", true),

            new Button(995,230,285,155,"3% Critical Hit Chance", true),
            new Button(995,407,285,155,"8% Critical Hit Chance", true),
            new Button(995,584,285,155,"15% Critical Hit Chance", true),
            new Button(995,761,285,155,"30% Critical Hit Chance", true),
        ]
        
        this.perkBuyButton = new Button(1364,400,470,80, "Buy Perk");
        this.perkButtons[0].selected = true;
        this.perkDescription = [
            {string: "This will add extra dammage to your attacks!", price: 1},
            {string: "This will add extra dammage to your attacks!", price: 2},
            {string: "This will add extra dammage to your attacks!", price: 3},
            {string: "This will add extra dammage to your attacks!", price: 4},
            {string: "You will start with extra health!", price: 1},
            {string: "You will start with extra health!", price: 2},
            {string: "You will start with extra health!", price: 3},
            {string: "You will start with extra health!", price: 4},
            {string: "Increase the damage the critical hit does!", price: 1},
            {string: "Increase the damage the critical hit does!", price: 2},
            {string: "Increase the damage the critical hit does!", price: 3},
            {string: "Increase the damage the critical hit does!", price: 4},
            {string: "Increase the chance of getting a critical hit!", price: 1},
            {string: "Increase the chance of getting a critical hit!", price: 2},
            {string: "Increase the chance of getting a critical hit!", price: 3},
            {string: "Increase the chance of getting a critical hit!", price: 4},
        ];

        this.perkConfirmWindow = false;
        this.perkConfirmConfirmButton = new Button(c.width/2-310, c.height/2, 300, 100, "Confirm");
        this.perkConfirmCancelButton = new Button(c.width/2+10, c.height/2, 300, 100, "Cancel");
    } 



    run() {
        //switch scenes
        switch(this.scene) {
            
            case -1: //login screen
                ctx.fillStyle = "black";
                ctx.fillRect(0,0,c.width,c.height);

                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.font = "100px Arial";
                ctx.fillText("Elemental 4", c.width/2, c.height/2-200);
                break;
            case 0: //splash screen
                if (this.splash.draw()) this.scene = 1;
                break;
            case 1: //title screen
                this.drawTitleScreen();
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
            // this.scene = 1;
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

    drawTitleScreen() {
        //background
        // ctx.fillStyle = "black";
        // ctx.fillRect(0,0,c.width,c.height);
        
        switch(this.titleCurrentMap) {
            case 1: 
            ctx.fillStyle="#08a9fc";
            ctx.fillRect(0,0,c.width,c.height);
            ctx.drawImage(waterMapCloud4,this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud4,c.width+this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapMountains,0,0,c.width,c.height);
            ctx.drawImage(waterMapCloud3,this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud3,c.width+this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud2,this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud2,c.width+this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud1,this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud1,c.width+this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloudSingle,this.cloud5pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloudSingle,c.width+this.cloud5pos.x,0,c.width,c.height);
            break;
            case 2: 
            ctx.fillStyle="#ff4c3c";
            ctx.fillRect(0,0,c.width,c.height);
            ctx.drawImage(fireMapCloud4,this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud4,c.width+this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapVolcano,0,0,c.width,c.height);
            ctx.drawImage(fireMapCloud3,this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud3,c.width+this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud2,this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud2,c.width+this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud1,this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud1,c.width+this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloudSingle,this.cloud5pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloudSingle,c.width+this.cloud5pos.x,0,c.width,c.height);
            break;
            case 3: 
            ctx.fillStyle="#74e3f5";
            ctx.fillRect(0,0,c.width,c.height);
            ctx.drawImage(earthMapHill3,0,0,c.width,c.height);
            ctx.drawImage(earthMapHill2,0,0,c.width,c.height);
            ctx.drawImage(earthMapCloud2,this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(earthMapCloud2,c.width+this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(earthMapHill1,0,0,c.width,c.height);
            ctx.drawImage(earthMapCloud1,this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(earthMapCloud1,c.width+this.cloud1pos.x,0,c.width,c.height);
            break;
            case 4:
            ctx.fillStyle="#08a9fc";
            ctx.fillRect(0,0,c.width,c.height);
            ctx.drawImage(waterMapCloud4,this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud4,c.width+this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud3,this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud3,c.width+this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud2,this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud2,c.width+this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud1,this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud1,c.width+this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloudSingle,this.cloud5pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloudSingle,c.width+this.cloud5pos.x,0,c.width,c.height);
            break;
        }

        if (this.titleMapTimer >= this.titleMapDuration) {
            this.titleCurrentMap++;
            if (this.titleCurrentMap >= 5) {
                this.titleCurrentMap = 1;
            }
            this.titleMapTimer = 0;
        } else {
            this.titleMapTimer+=dt;
        }


        this.cloud1pos.x-=this.cloudMoveSpeed*dt;
        this.cloud2pos.x-=this.cloudMoveSpeed*0.9*dt;
        this.cloud3pos.x-=this.cloudMoveSpeed*0.5*dt;
        this.cloud4pos.x-=this.cloudMoveSpeed*0.2*dt;
        this.cloud5pos.x-=this.cloudMoveSpeed*dt;

        if (this.cloud1pos.x <= -c.width) {
            this.cloud1pos.x = 0;
        }
        if (this.cloud2pos.x <= -c.width) {
            this.cloud2pos.x = 0;
        }
        if (this.cloud3pos.x <= -c.width) {
            this.cloud3pos.x = 0;
        }
        if (this.cloud4pos.x <= -c.width) {
            this.cloud4pos.x = 0;
        }
        if (this.cloud5pos.x <= -c.width) {
            this.cloud5pos.x = 0;
        }
        this.windParticleSystem.draw();
        
        //draw title text
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "100px Arial";
        ctx.fillText("Elemental 4", c.width/2, c.height/2-200);
        
        // play button
        this.playButton.draw(dt,mouseX,mouseY);

        //logged in as text
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.font = "30px Arial";
        ctx.fillText("Logged in as " + game.myData.gamerTag, 50, 50);

        //logout
        this.logoutButton.draw(dt, mouseX, mouseY);
     
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
        this.projectWebsiteButton.draw(dt,mouseX,mouseY);
        
    }

    drawPerkScreen() {
        ctx.fillStyle = "blue";
        ctx.fillRect (0,0,c.width, c.height);

        //this will draw the Perk screen text
        ctx.fillStyle= "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
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
        ctx.font = "30px Arial";

        ctx.fillText("Damage Boost",192,200);
        ctx.fillText("Starting Health",507,200);
        ctx.fillText("Critical Damage",822,200);
        ctx.fillText("Critcal Hit Chance",1137,200);

        ctx.fillStyle = "white";
        ctx.fillRect(1305,150,589,766);

        ctx.fillStyle = "black";
        ctx.fillText("Perk Information", 1599,200);
        ctx.fillText("Skill Points Available", 1452,633);
        ctx.fillText("Skill Progress", 1746,633);
        ctx.fillText("5/25", 1746,860);

        ctx.font = "180px Arial";
        ctx.fillText("5", 1452,815);

        //perk description
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "25px Arial";
        ctx.fillText(this.perkDescription[this.selectedPerk].string, 1599,240);

        //perk price
        ctx.font = "30px Arial";
        ctx.fillText("Price", 1599,300);
        ctx.font = "100px Arial";
        ctx.fillText(this.perkDescription[this.selectedPerk].price, 1599,370);

        //Buy button
        this.perkBuyButton.draw(dt,mouseX,mouseY);

        //confirm window
        if (this.perkConfirmWindow) {
            ctx.fillStyle = "red";
            ctx.fillRect(c.width/2-600,c.height/2-300, 1800, 600);

            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "30px Arial";
            ctx.fillText("Are you sure?", c.width/2, c.height/2-200);

            this.perkConfirmConfirmButton.draw(dt, mouseX, mouseY);
            this.perkConfirmCancelButton.draw(dt, mouseX, mouseY);
        }
    }
    

    drawPickCharacter() {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,c.width, c.height);

        ctx.fillStyle= "white";
        ctx.font = "80px Arial";
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
        ctx.font = "40px Arial";
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
        switch(game.map) {
            case 1: 
            ctx.fillStyle="#08a9fc";
            ctx.fillRect(0,0,c.width,c.height);
            ctx.drawImage(waterMapCloud4,this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud4,c.width+this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapMountains,0,0,c.width,c.height);
            ctx.drawImage(waterMapCloud3,this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud3,c.width+this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud2,this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud2,c.width+this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud1,this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud1,c.width+this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloudSingle,this.cloud5pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloudSingle,c.width+this.cloud5pos.x,0,c.width,c.height);
            break;
            case 2: 
            ctx.fillStyle="#ff4c3c";
            ctx.fillRect(0,0,c.width,c.height);
            ctx.drawImage(fireMapCloud4,this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud4,c.width+this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapVolcano,0,0,c.width,c.height);
            ctx.drawImage(fireMapCloud3,this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud3,c.width+this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud2,this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud2,c.width+this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud1,this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloud1,c.width+this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloudSingle,this.cloud5pos.x,0,c.width,c.height);
            ctx.drawImage(fireMapCloudSingle,c.width+this.cloud5pos.x,0,c.width,c.height);
            break;
            case 3: 
            ctx.fillStyle="#74e3f5";
            ctx.fillRect(0,0,c.width,c.height);
            ctx.drawImage(earthMapHill3,0,0,c.width,c.height);
            ctx.drawImage(earthMapHill2,0,0,c.width,c.height);
            ctx.drawImage(earthMapCloud2,this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(earthMapCloud2,c.width+this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(earthMapHill1,0,0,c.width,c.height);
            ctx.drawImage(earthMapCloud1,this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(earthMapCloud1,c.width+this.cloud1pos.x,0,c.width,c.height);
            break;
            case 4:
            ctx.fillStyle="#08a9fc";
            ctx.fillRect(0,0,c.width,c.height);
            ctx.drawImage(waterMapCloud4,this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud4,c.width+this.cloud4pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud3,this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud3,c.width+this.cloud3pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud2,this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud2,c.width+this.cloud2pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud1,this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloud1,c.width+this.cloud1pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloudSingle,this.cloud5pos.x,0,c.width,c.height);
            ctx.drawImage(waterMapCloudSingle,c.width+this.cloud5pos.x,0,c.width,c.height);
            break;
        }

        this.cloud1pos.x-=this.cloudMoveSpeed*dt;
        this.cloud2pos.x-=this.cloudMoveSpeed*0.9*dt;
        this.cloud3pos.x-=this.cloudMoveSpeed*0.5*dt;
        this.cloud4pos.x-=this.cloudMoveSpeed*0.2*dt;
        this.cloud5pos.x-=this.cloudMoveSpeed*dt;

        if (this.cloud1pos.x <= -c.width) {
            this.cloud1pos.x = 0;
        }
        if (this.cloud2pos.x <= -c.width) {
            this.cloud2pos.x = 0;
        }
        if (this.cloud3pos.x <= -c.width) {
            this.cloud3pos.x = 0;
        }
        if (this.cloud4pos.x <= -c.width) {
            this.cloud4pos.x = 0;
        }
        if (this.cloud5pos.x <= -c.width) {
            this.cloud5pos.x = 0;
        }

        this.windParticleSystem.draw();

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
        // ctx.strokeText("Player " + game.whichPlayerAmI, c.width/2, 100);
        // ctx.fillText("Player " + game.whichPlayerAmI, c.width/2, 100);

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
        ctx.strokeText(game.myData.gamerTag, 50, 100);
        ctx.fillText(game.myData.gamerTag, 50, 100);

        ctx.textAlign = "right";
        
        ctx.strokeText(game.player2.gamerTag ,c.width -50, 100);
        ctx.fillText(game.player2.gamerTag ,c.width -50, 100);


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

        //healthbar
        this.player1HealthBar.draw();

        ctx.save();
        ctx.scale(-1,1);
        this.player2HealthBar.draw();
        ctx.restore();
    }
    drawGameResults() {
        //background
        ctx.fillStyle = "rgb(100,100,100)";
        ctx.fillRect(0,0,c.width,c.height);

        //this will draw the Game results screen text
        ctx.fillStyle= "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
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

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.font = "30px Arial"
        ctx.fillText("Current XP: " + (Math.floor(this.xpHealthBar.value*100))+"xp", c.width/2-350, c.height/2-100);
        ctx.fillText("XP Needed for Next Level: "+ (this.xpHealthBar.maxValue*100)+"xp", c.width/2+350, c.height/2-100);
        
        ctx.textAlign = "center";
        ctx.fillText("+"+game.xpGain+"xp", c.width/2, c.height/2-100);
        ctx.fillText("Level " + ((this.xpHealthBar.maxValue/10)-1) , c.width/2, c.height/2-250);
        
        if (game.levelUp) {
            ctx.textAlign = "center";
            ctx.fillStyle = "lime";
            ctx.fillText("Level Up!", c.width/2, c.height/2-200);
        }

        this.xpHealthBar.draw();

        this.resultsBackButton.draw(dt,mouseX,mouseY);
    }


    
    mouseClick() {
        switch(this.scene) {
            case 1: //title screen
                if (this.playButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 4; 
                } else if (this.logoutButton.mouseOver(mouseX, mouseY)) {
                    logout();
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
                } else if (this.projectWebsiteButton.mouseOver(mouseX,mouseY)) {
                    location.href = "https://msadhak01.wixsite.com/elemental4"; 
                }   
                break;
            case 5: //perk screen
                if(this.perkBackButton.mouseOver(mouseX,mouseY)) {
                    this.scene = 4;
                    break;
                } else if (this.perkBuyButton.mouseOver(mouseX, mouseY)) {
                    this.perkConfirmWindow = true;
                    break;
                } else if (this.perkConfirmCancelButton.mouseOver(mouseX, mouseY)) {
                    this.perkConfirmWindow = false;
                    break;
                } else if (this.perkConfirmConfirmButton.mouseOver(mouseX, mouseY)) {
                    //buy perk
                    buyPerk(this.selectedPerk);
                    break;
                }
                for (let i= 0;i<this.perkButtons.length; i++){
                    if (this.perkButtons[i].mouseOver(mouseX,mouseY)){
                        this.perkButtons.forEach(b=>{
                            b.selected = false;
                        })
                        this.perkButtons[i].selected = true;
                        this.selectedPerk = i;

                        break;
                    }
                }

                break;
            case 6: //character select
                if (this.characterSelect.fire.mouseOver(mouseX,mouseY)) {
                    selectPlayer(0);
                    this.player1Animator = new Animator("fire", this.character1X,this.character1Y,this.characterWidth,this.characterHeight);
                    this.scene = 7;
                } else if (this.characterSelect.water.mouseOver(mouseX,mouseY)) {
                    selectPlayer(1);
                    this.player1Animator = new Animator("water",this.character1X,this.character1Y,this.characterWidth,this.characterHeight);
                    this.scene = 7;
                } else if (this.characterSelect.earth.mouseOver(mouseX,mouseY)) {
                    selectPlayer(2);
                    this.player1Animator = new Animator("earth",this.character1X-220,this.character1Y-270,this.characterWidth*1.4,this.characterHeight*1.4);
                    this.scene = 7;
                } else if (this.characterSelect.air.mouseOver(mouseX,mouseY)) {
                    selectPlayer(3);
                    this.player1Animator = new Animator("air",this.character1X,this.character1Y,this.characterWidth,this.characterHeight);
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