class SceneManager {
    constructor(start) {
        this.scene = start;
        this.splash = new Splash();
    }

    run(dt) {
        //switch scenes
        switch(this.scene) {
            case 0:
                if (this.splash.draw(dt)) this.scene++;
                break;
            case 1:
                this.drawTitleScreen();
                break;
            case 2:
                drawSettings();
                break;
            case 3:
                drawCredits();
                break;
            case 4:
                drawMenu();
                break;
            case 5:
                drawGame();
                break;
            case 6:
                drawGameResults();
                break;
        }
    }

    drawTitleScreen() {
        //background
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,c.width,c.height);
    
        //draw title text
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "100px Arial";
        ctx.fillText("Elemental 4", c.width/2, c.height/2);
    }
}