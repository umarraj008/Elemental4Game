class Animator {
    constructor(type, x, y, w, h) {
        this.currentAnimation = "idle";
        
        switch(type) {
            case "fire":
                this.spriteSheet = fireSpriteSheet;
                break;
            case "water":
                this.spriteSheet = waterSpriteSheet;
                break;
            case "earth":
                this.spriteSheet = earthSpriteSheet;
                break;
              case "air":
                this.spriteSheet = airSpriteSheet;
                break;
        }

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.animations = {
            idle:     {totalFrames: 6, counter: 0, offX: 0, offY: 190*0, frameWidth: 231, frameHeight: 190, dontLoop: false},
            attack:   {totalFrames: 8, counter: 0, offX: 0, offY: 190*1, frameWidth: 231, frameHeight: 190, dontLoop: true},
            ultimate: {totalFrames: 8, counter: 0, offX: 0, offY: 190*2, frameWidth: 231, frameHeight: 190, dontLoop: true},
            wait:     {totalFrames: 6, counter: 0, offX: 0, offY: 190*3, frameWidth: 231, frameHeight: 190, dontLoop: true},
            heal:     {totalFrames: 6, counter: 0, offX: 0, offY: 190*3, frameWidth: 231, frameHeight: 190, dontLoop: true},
            damage:   {totalFrames: 4, counter: 0, offX: 0, offY: 190*4, frameWidth: 231, frameHeight: 190, dontLoop: true},
            dead:     {totalFrames: 7, counter: 0, offX: 0, offY: 190*5, frameWidth: 231, frameHeight: 190, dontLoop: false},
        }

        this.timer = 0;
    }

    draw() {
        switch(this.currentAnimation) {
            case "idle":
                this.animate(this.animations.idle);
                break;
            case "attack":
                this.animate(this.animations.attack);
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

    switchAnimation(to) {
        switch (to) {
            case "idle":
                this.animations.idle.counter = 0;
                this.animations.idle.offX = 0;
                this.currentAnimation = "idle";
                break;
            case "attack":
                this.animations.attack.counter = 0;
                this.animations.attack.offX = 0;
                this.currentAnimation = "attack";
                break;
            case "ultimate":
                this.animations.ultimate.counter = 0;
                this.animations.ultimate.offX = 0;
                this.currentAnimation = "ultimate";
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