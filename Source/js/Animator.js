class Animator {
    constructor(type, x, y, w, h) {
        this.currentAnimation = "idle";
        this.animations = null;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.timer = 0;
        this.spriteSheet = null;

        switch(type) {
            case "fire":
                this.spriteSheet = fireSpriteSheet;
                this.animations = {
                    idle:     {totalFrames:  8, counter: 0, offX: 0, offY:  112*0, frameWidth: 224, frameHeight: 112, dontLoop: false},
                    attack1:  {totalFrames: 11, counter: 0, offX: 0, offY:  112*6, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    attack2:  {totalFrames: 19, counter: 0, offX: 0, offY:  112*7, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    attack3:  {totalFrames: 28, counter: 0, offX: 0, offY:  112*8, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    ultimate: {totalFrames: 18, counter: 0, offX: 0, offY:  112*9, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    wait:     {totalFrames: 10, counter: 0, offX: 0, offY: 112*10, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    heal:     {totalFrames: 10, counter: 0, offX: 0, offY: 112*10, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    damage:   {totalFrames:  6, counter: 0, offX: 0, offY: 112*11, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    dead:     {totalFrames: 13, counter: 0, offX: 0, offY: 112*12, frameWidth: 224, frameHeight: 112, dontLoop: false},
                    
                    damageTime1: 700,
                    damageTime2: 1000,
                    damageTime3: 1800,
                    damageTime4: 1000,
                }
                break;
            case "water":
                this.spriteSheet = waterSpriteSheet;
                this.animations = {
                    idle:     {totalFrames:  8, counter: 0, offX: 0, offY:  112*0, frameWidth: 224, frameHeight: 112, dontLoop: false},
                    attack1:  {totalFrames:  7, counter: 0, offX: 0, offY:  112*6, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    attack2:  {totalFrames: 21, counter: 0, offX: 0, offY:  112*7, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    attack3:  {totalFrames: 27, counter: 0, offX: 0, offY:  112*8, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    ultimate: {totalFrames: 32, counter: 0, offX: 0, offY:  112*9, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    wait:     {totalFrames: 12, counter: 0, offX: 0, offY: 112*10, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    heal:     {totalFrames: 12, counter: 0, offX: 0, offY: 112*10, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    damage:   {totalFrames:  7, counter: 0, offX: 0, offY: 112*12, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    dead:     {totalFrames: 16, counter: 0, offX: 0, offY: 112*13, frameWidth: 224, frameHeight: 112, dontLoop: false},

                    damageTime1: 300,
                    damageTime2: 1100,
                    damageTime3: 1800,
                    damageTime4: 1000,
                }
                break;
            case "earth":
                this.spriteSheet = earthSpriteSheet;
                this.animations = {
                    idle:     {totalFrames: 6, counter: 0, offX: 0, offY: 128*0, frameWidth: 288, frameHeight: 128, dontLoop: false},
                    attack1:   {totalFrames: 6, counter: 0, offX: 0, offY: 128*4, frameWidth: 288, frameHeight: 128, dontLoop: true},
                    attack2:   {totalFrames: 12, counter: 0, offX: 0, offY: 128*5, frameWidth: 288, frameHeight: 128, dontLoop: true},
                    attack3:   {totalFrames: 24, counter: 0, offX: 0, offY: 128*6, frameWidth: 288, frameHeight: 128, dontLoop: true},
                    ultimate: {totalFrames: 25, counter: 0, offX: 0, offY: 128*7, frameWidth: 288, frameHeight: 128, dontLoop: true},
                    wait:     {totalFrames: 16, counter: 0, offX: 0, offY: 128*8, frameWidth: 288, frameHeight: 128, dontLoop: true},
                    heal:     {totalFrames: 16, counter: 0, offX: 0, offY: 128*8, frameWidth: 288, frameHeight: 128, dontLoop: true},
                    damage:   {totalFrames: 6, counter: 0, offX: 0, offY: 128*11, frameWidth: 288, frameHeight: 128, dontLoop: true},
                    dead:     {totalFrames: 18, counter: 0, offX: 0, offY: 128*12, frameWidth: 288, frameHeight: 128, dontLoop: false},

                    damageTime1: 400,
                    damageTime2: 1000,
                    damageTime3: 1800,
                    damageTime4: 1500,
                }
                break;
              case "air":
                this.spriteSheet = airSpriteSheet;
                this.animations = {
                    idle:     {totalFrames: 8, counter: 0, offX: 0, offY:  112*0, frameWidth: 224, frameHeight: 112, dontLoop: false},
                    attack1:  {totalFrames: 8, counter: 0, offX: 0, offY:  112*5, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    attack2:  {totalFrames: 18, counter: 0, offX: 0, offY:  112*6, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    attack3:  {totalFrames: 26, counter: 0, offX: 0, offY:  112*7, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    ultimate: {totalFrames: 30, counter: 0, offX: 0, offY:  112*8, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    wait:     {totalFrames: 8, counter: 0, offX: 0, offY:  112*9, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    heal:     {totalFrames: 8, counter: 0, offX: 0, offY:  112*9, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    damage:   {totalFrames: 6, counter: 0, offX: 0, offY: 112*10, frameWidth: 224, frameHeight: 112, dontLoop: true},
                    dead:     {totalFrames: 19, counter: 0, offX: 0, offY: 112*11, frameWidth: 224, frameHeight: 112, dontLoop: false},

                    damageTime1: 700,
                    damageTime2: 1000,
                    damageTime3: 1800,
                    damageTime4: 1000,
                }
                break;
        }
    }

    draw() {
        switch(this.currentAnimation) {
            case "idle":
                this.animate(this.animations.idle);
                break;
            case "attack1":
                this.animate(this.animations.attack1);
                break;
            case "attack2":
                this.animate(this.animations.attack2);
                break;
            case "attack3":
                this.animate(this.animations.attack3);
                break;
            case "ultimate":
                this.animate(this.animations.ultimate);
                break;
            case "wait":
                this.animate(this.animations.wait);
                break;
            case "heal":
                this.animate(this.animations.heal);
                break;
            case "damage":
                this.animate(this.animations.damage);
                break;
            case "dead":
                this.animate(this.animations.dead);
                break;
        }
    }

    animate(which) {
        ctx.drawImage(this.spriteSheet,
            which.offX, which.offY, which.frameWidth, which.frameHeight,
            this.x, this.y, this.w, this.h);
        
        if (this.currentAnimation == "dead" && which.counter == which.totalFrames-1) {
            which.counter = which.totalFrames-1;
            which.offX = (which.totalFrames-1)*which.frameWidth;
            return;
        }

        this.timer+=dt;
        if (this.timer >= 83) {
            which.offX += which.frameWidth;
            which.counter++;
            this.timer = 0;
        }

        if (which.counter > which.totalFrames-1) {
            which.counter = 0;
            which.offX = 0;

            if (which.dontLoop) {
                this.switchAnimation("idle");
            }
        }
    }

    switchAnimation(to, playerAnimator, healthBar, value, perkBar, value2) {
        switch (to) {
            case "idle":
                this.animations.idle.counter = 0;
                this.animations.idle.offX = 0;
                this.currentAnimation = "idle";
                break;
            case "attack1":
                this.animations.attack1.counter = 0;
                this.animations.attack1.offX = 0;
                this.currentAnimation = "attack1";
                window.setTimeout(function() {playerAnimator.switchAnimation("damage"); healthBar.changeValue(value);perkBar.changeValue(value2); sceneManager.playSoundEffect("hit")}, this.animations.damageTime1);
                break;
            case "attack2":
                this.animations.attack2.counter = 0;
                this.animations.attack2.offX = 0;
                this.currentAnimation = "attack2";
                window.setTimeout(function() {playerAnimator.switchAnimation("damage");healthBar.changeValue(value);perkBar.changeValue(value2); sceneManager.playSoundEffect("hit")}, this.animations.damageTime2);
                break;
            case "attack3":
                this.animations.attack3.counter = 0;
                this.animations.attack3.offX = 0;
                this.currentAnimation = "attack3";
                window.setTimeout(function() {playerAnimator.switchAnimation("damage");healthBar.changeValue(value);perkBar.changeValue(value2); sceneManager.playSoundEffect("hit")}, this.animations.damageTime3);
                break; 
            case "ultimate":
                this.animations.ultimate.counter = 0;
                this.animations.ultimate.offX = 0;
                this.currentAnimation = "ultimate";
                window.setTimeout(function() {playerAnimator.switchAnimation("damage");healthBar.changeValue(value);perkBar.changeValue(value2); sceneManager.playSoundEffect("hit")}, this.animations.damageTime4);
                break;
            case "wait":
                this.animations.wait.counter = 0;
                this.animations.wait.offX = 0;
                this.currentAnimation = "wait";
                break;
            case "heal":
                this.animations.heal.counter = 0;
                this.animations.heal.offX = 0;
                this.currentAnimation = "heal";
                break;
            case "damage":
                this.animations.damage.counter = 0;
                this.animations.damage.offX = 0;
                this.currentAnimation = "damage";
                break;
            case "dead":
                this.animations.dead.counter = 0;
                this.animations.dead.offX = 0;
                this.currentAnimation = "dead";
                break;
        }
    }
}