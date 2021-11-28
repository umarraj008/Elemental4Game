class Camera {
    constructor(){
        this.shakeAmount = 0;
        this.shakeDissapationRate = 0.1;
        this.glowAmount = 0;
        this.glowColor ="rgba(255,0,0,";
        this.glowDissapationRate = 0.1;
        this.transitionOpacity = 0;
        this.transitionSpeed = 0.1;
        this.scene = 0;
        this.transitionEnabled = false;
        this.transitionUp = true;
    }
    
    preShake(){
        if (this.shakeAmount !=0){
            ctx.save()
            ctx.translate (Math.random() * this.shakeAmount,Math.random() * this.shakeAmount);
        }        
    }

    postShake(){
        if (this.shakeAmount !=0){
            ctx.restore()
        
            if (this.shakeAmount <=0){
                this.shakeAmount=0;
            }else{
                this.shakeAmount -= this.shakeDissapationRate;
            }
        }
    }

    shake(amount,dissRate){
        this.shakeAmount = amount;
        this.shakeDissapationRate = dissRate;
    
    }

    drawGlow(){
        if (this.glowAmount !=0){
            ctx.fillStyle = this.glowColor + this.glowAmount + ")"
            ctx.fillRect(0,0,c.width,c.height)

            if (this.glowAmount <=0){
                this.glowAmount = 0;

            }else{ 
                this.glowAmount -= this.glowDissapationRate;
            }   
        }
    }

    glow(start,dissRate,color){
        this.glowColor = color;
        this.glowAmount = start;
        this.glowDissapationRate = dissRate;
    }

    drawTransition(){

        if (this.transitionEnabled){
            ctx.fillStyle = "rgba(0,0,0," + this.transitionOpacity + ")"
            ctx.fillRect(0,0,c.width,c.height);

            if (this.transitionUp){
                this.transitionOpacity += this.transitionSpeed;
                
                if (this.transitionOpacity >= 1){
                    this.transitionUp = false;
                    this.transitionOpacity = 1;
                    sceneManager.scene = this.scene;
                }
            }else{
                this.transitionOpacity -=  this.transitionSpeed;

                if (this.transitionOpacity <= 0){
                    this.transitionUp = true;
                    this.transitionOpacity = 0;
                    this.transitionEnabled = false;
                }
            }
        }
    }

    transitionTo(scene,speed){
        this.scene = scene;
        this.transitionSpeed = Speed;
        this.tranasitionEnabled = true;
        this.transitionUp = true;


    }
}