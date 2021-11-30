class Indicator{
    
    constructor (t,x,y,c) {
        this.text = t;
        this.x = x;
        this.y = y;
        this.color = c;
        this.font = "30px Arial";
        this.speed = 0.2;
        this.opacitySpeed = 0.001;
        this.opacity = 1;
    }
 
    draw(){
        ctx.fillStyle = this.color + this.opacity + ")";
        ctx.textAlign = "center";
        ctx.font = this.font;
        
        ctx.fillText(this.text,this.x,this.y);
        this.y -= this.speed*dt;
        this.opacity -= this.opacitySpeed*dt;

        if (this.opacity < 0 ){
            return true;
        }
    }
}
