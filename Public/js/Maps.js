class Maps {
    constructor() {
        this.opacityTransision = false;
        this.currentMap1 = 0;
        this.currentMap2 = Math.floor(Math.random()*3);
        this.timer = 0;
        this.changeTo = 0;
        this.offset = 400;
        this.clipX = c.width;
        this.current = 1;
        this.opacity = 1;
        this.time = 6000;
        this.cloud1Pos = {x: 0};
        this.cloud2Pos = {x: 0};
        this.cloud3Pos = {x: 0};
        this.cloud4Pos = {x: 0};
        this.cloud5Pos = {x: 0};
        this.moveSpeed = 0.1;
        this.windParticleSystem = new WindParticleSystem(500);
    }
    
    drawNormal(which) {
        this.drawMap(which);
        if (SETTINGS.movingBackground) {
            this.update();
        }
    }

    drawTransition(title) {
        this.drawFade(title);
        this.transitionUpdate();
    }

    drawFade(title) {
        if (this.opacityTransision) {
            this.drawMap(this.changeTo);
            
            if (title) {
                this.drawTitle(this.changeTo);
            }

            ctx.save();
            ctx.globalAlpha = this.opacity;
            this.drawMap(this.currentMap2);
            if (title) {
                this.drawTitle(this.currentMap2);
            }
            ctx.restore();

            this.opacity -= 0.001*dt;
            if (this.opacity <= 0) {
                this.opacityTransision = false;
                this.opacity = 1;
                this.currentMap2 = this.changeTo;
            }
        } else {
            this.drawMap(this.currentMap2);
            if (title) {
                this.drawTitle(this.currentMap2);
            }
        }

        if (SETTINGS.movingBackground == true) {
            this.update();
        }
    }

    drawTitle(which) {
        switch(which) {
            case 0: ctx.drawImage(titleImage, 0, 0, 1389, 198, c.width/2-694,c.height/2-300, 1389, 198); break; //water
            case 1: ctx.drawImage(titleImage, 0, 198.25, 1389, 198, c.width/2-694,c.height/2-300, 1389, 198); break; //fire
            case 2: ctx.drawImage(titleImage, 0, 396.5, 1389, 198, c.width/2-694,c.height/2-300, 1389, 198); break; //air
            case 3: ctx.drawImage(titleImage, 0, 594.75, 1389, 198, c.width/2-694,c.height/2-300, 1389, 198); break; //earth
        }
    }

    drawMap(m) {
        switch(m) {
            case 0: this.drawWater(); break;
            case 1: this.drawFire(); break;
            case 2: this.drawAir(); break;
            case 3: this.drawEarth(); break;
        }

        if (SETTINGS.windParticles == true) {
            this.windParticleSystem.draw();
        }
    }

    update() {
        this.cloud1Pos.x -= (this.moveSpeed)*dt;
        this.cloud2Pos.x -= (this.moveSpeed*0.9)*dt;
        this.cloud3Pos.x -= (this.moveSpeed*0.5)*dt;
        this.cloud4Pos.x -= (this.moveSpeed*0.2)*dt;
        this.cloud5Pos.x -= (this.moveSpeed)*dt;

        // glowCounter += glowSpeed;

        if (this.cloud1Pos.x <= -c.width) {
            this.cloud1Pos.x = 0;
        }
        
        if (this.cloud2Pos.x <= -c.width) {
            this.cloud2Pos.x = 0;
        }
        
        if (this.cloud3Pos.x <= -c.width) {
            this.cloud3Pos.x = 0;
        }
        
        if (this.cloud4Pos.x <= -c.width) {
            this.cloud4Pos.x = 0;
        }
        
        if (this.cloud5Pos.x <= -c.width) {
            this.cloud5Pos.x = 0;
        }
    }

    transitionUpdate() {
        this.timer += dt;
        if (this.timer >= (this.time)) {
            this.timer = 0;
            let temp1 = this.currentMap1 + 1;
            if (temp1 >= 4) temp1 = 0;
            this.transisionTo(temp1);
            let temp2 = this.currentMap2 + 1;
            if (temp2 >= 4) temp2 = 0;
            this.transisionTo(temp2);
        }
    }

    drawWater() {
        ctx.fillStyle = "#08a9fc";
        ctx.fillRect(0,0,c.width,c.height);
        
        ctx.drawImage(waterMapCloud4, this.cloud4Pos.x ,0,c.width,c.height);
        ctx.drawImage(waterMapCloud4, c.width + this.cloud4Pos.x,0,c.width,c.height);

        ctx.drawImage(waterMapMountains, 0,0,c.width,c.height);

        ctx.drawImage(waterMapCloud3, this.cloud3Pos.x,0,c.width,c.height);
        ctx.drawImage(waterMapCloud3, c.width + this.cloud3Pos.x,0,c.width,c.height);

        ctx.drawImage(waterMapCloud2, this.cloud2Pos.x,0,c.width,c.height);
        ctx.drawImage(waterMapCloud2, c.width + this.cloud2Pos.x,0,c.width,c.height);

        ctx.drawImage(waterMapCloud1, this.cloud1Pos.x,0,c.width,c.height);
        ctx.drawImage(waterMapCloud1, c.width + this.cloud1Pos.x,0,c.width,c.height);

        ctx.drawImage(waterMapCloudSingle, this.cloud5Pos.x,0,c.width,c.height);
        ctx.drawImage(waterMapCloudSingle, c.width + this.cloud5Pos.x,0,c.width,c.height);
    }

    drawFire() {
        ctx.fillStyle = "#ff4c3c";
        ctx.fillRect(0,0,c.width,c.height);

        ctx.drawImage(fireMapCloud4, this.cloud4Pos.x ,0,c.width,c.height);
        ctx.drawImage(fireMapCloud4, c.width + this.cloud4Pos.x ,0,c.width,c.height);

        ctx.drawImage(fireMapVolcano, 0,0,c.width,c.height);

        ctx.drawImage(fireMapCloud3, this.cloud3Pos.x,0,c.width,c.height);
        ctx.drawImage(fireMapCloud3, c.width + this.cloud3Pos.x,0,c.width,c.height);

        ctx.drawImage(fireMapCloud2, this.cloud2Pos.x,0,c.width,c.height);
        ctx.drawImage(fireMapCloud2, c.width + this.cloud2Pos.x,0,c.width,c.height);

        ctx.drawImage(fireMapCloud1, this.cloud1Pos.x,0,c.width,c.height);
        ctx.drawImage(fireMapCloud1, c.width + this.cloud1Pos.x,0,c.width,c.height);

        ctx.drawImage(fireMapCloudSingle, this.cloud5Pos.x,0,c.width,c.height);
        ctx.drawImage(fireMapCloudSingle, c.width + this.cloud5Pos.x,0,c.width,c.height);
    }
    
    drawEarth() {
        ctx.fillStyle = "#74e3f5";
        ctx.fillRect(0,0,c.width,c.height);

        ctx.drawImage(earthMapHill3, 0,0,c.width,c.height);
        ctx.drawImage(earthMapHill2, 0,0,c.width,c.height);

        ctx.drawImage(earthMapCloud2, this.cloud4Pos.x,0,c.width,c.height);
        ctx.drawImage(earthMapCloud2, c.width + this.cloud4Pos.x,0,c.width,c.height);
        
        ctx.drawImage(earthMapHill1, 0,0,c.width,c.height);

        ctx.drawImage(earthMapCloud1, this.cloud1Pos.x,0,c.width,c.height);
        ctx.drawImage(earthMapCloud1, c.width + this.cloud1Pos.x,0,c.width,c.height);

    }

    drawAir() {
        ctx.fillStyle = "#08a9fc";
        ctx.fillRect(0,0,c.width,c.height);

        ctx.drawImage(waterMapCloud4, this.cloud4Pos.x ,0,c.width,c.height);
        ctx.drawImage(waterMapCloud4, c.width + this.cloud4Pos.x ,0,c.width,c.height);

        ctx.drawImage(waterMapCloud3, this.cloud3Pos.x,0,c.width,c.height);
        ctx.drawImage(waterMapCloud3, c.width + this.cloud3Pos.x,0,c.width,c.height);

        ctx.drawImage(waterMapCloud2, this.cloud2Pos.x,0,c.width,c.height);
        ctx.drawImage(waterMapCloud2, c.width + this.cloud2Pos.x,0,c.width,c.height);

        ctx.drawImage(waterMapCloud1, this.cloud1Pos.x,0,c.width,c.height);
        ctx.drawImage(waterMapCloud1, c.width + this.cloud1Pos.x,0,c.width,c.height);

        ctx.drawImage(waterMapCloudSingle, this.cloud5Pos.x,0,c.width,c.height);
        ctx.drawImage(waterMapCloudSingle, c.width + this.cloud5Pos.x,0,c.width,c.height);
    }

    transisionTo(to) {
        this.opacityTransision = true;
        this.changeTo = to;
        this.clipX = c.width;
        this.opacity = 1;
    }
}