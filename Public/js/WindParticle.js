class WindParticle{
    constructor(){
        this.x = (Math.random() * c.width);
        this.y =(Math.random() * c.height-500);
        this.minSpeed = 1;
        this.maxSpeed = 5;
        this.speed = ((Math.random() * this.maxSpeed)+this.minSpeed);
        this.points = [];
        this.counter = 0;
        this.amplitude = 2;
        this.frequency = 50;
        this.particleLength = 25;
        this.points.push(new WindPoint(this.x,this.y));
        this.points.push(new WindPoint(this.x + this.particleLength,this.y));
        this.points.push(new WindPoint(this.x + this.particleLength *2,this.y));
        this.points.push(new WindPoint(this.x + this.particleLength *3,this.y));
        this.points.push(new WindPoint(this.x + this.particleLength *4,this.y));
        this.points.push(new WindPoint(this.x + this.particleLength *5,this.y));
    }

    drawParticle(){
       
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();

        this.points.forEach(p=>{
            ctx.lineTo(p.x,p.y + p.yo);
            p.x -= this.speed;
            this.counter++;
            p.yo= (Math.sin(p.x/this.frequency)*this.amplitude); 
        });
        
        ctx.stroke();

         if(this.points[5].x <= -20){
             this.points.forEach(p=>{
                 p.x+=c.width + 500;
             });
        }
    } 
}