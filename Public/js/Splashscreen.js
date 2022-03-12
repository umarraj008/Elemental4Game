class Splash {
    constructor() {
        this.counter = 0;
        this.transisionSpeed = 0.001;
        this.opacity = 0;
        this.duration = 3000
        this.transisionIn = true;
    }

    draw() {
        //background
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,c.width,c.height);
        
        //text
        ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
        ctx.textAlign = "center";
        ctx.font = "70px pixel";
        ctx.fillText("Cybercloud Studios", c.width/2, c.height/2);
        ctx.font = "50px pixel";
        ctx.fillText("Presents", c.width/2, c.height/2+50);

        //transision in
        if (this.opacity < 1 && this.transisionIn) {
            this.opacity+= dt * this.transisionSpeed;

            if (this.opacity >= 1) {
                this.opacity = 1;
                this.transisionIn = false;
            }
        }

        //transision out
        if (this.counter > this.duration && !this.transisionIn) {
            this.opacity -= dt * this.transisionSpeed;

            if (this.opacity <= 0) {
                this.opacity = 0;
                return true;
            }
        }
        
        this.counter += dt;
    }

}