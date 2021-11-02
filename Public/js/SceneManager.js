class SceneManager {
    constructor(start) {
        this.scene = start;
        this.splash = new Splash();

        this.playButton = new Button(100,100,100,100);
        this.settingsButton = new Button(400,400,400,400);
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
            case 6: //game screen
                // this.drawGame();
                break;
            case 7: //results screen
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
        ctx.fillText("Settings", c.width/2, c.height/2+100);
        
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


    mouseClick() {
        switch(this.scene) {
            case 1: //title screen
                if (this.playButton.mouseOver(mouseX,mouseY)) {
                    this.scene++;
                }
                console.log("test");
                break;
            case 2: //settings screen
                
                break;
            case 3: //credits screen
                
                break;
            case 4: //menu screen

                break;
            case 5: //game screen

                break;
            case 6: //results screen

                break;
        }
    }
}