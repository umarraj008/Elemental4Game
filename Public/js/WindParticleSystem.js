class WindParticleSystem{
    constructor(offset){
        this.windParticles=[];
        for(let i=0;i<25;i++){
            this.windParticles.push(new WindParticle(offset));
        }
    }
    draw(){
        this.windParticles.forEach(p=>{
            if(p.x<=c.width && p.x>= 0){
                p.drawParticle();
            }
        });
    }
}
