class Splash{constructor(){this.counter=0,this.transisionSpeed=.001,this.opacity=0,this.duration=3e3,this.transisionIn=!0,this.wp=new WindParticleSystem(0)}draw(){if(ctx.fillStyle="black",ctx.fillRect(0,0,c.width,c.height),this.wp.draw(),ctx.fillStyle="rgba(255,255,255,"+this.opacity+")",ctx.textAlign="center",ctx.font="70px pixel",ctx.shadowBlur=50*this.opacity,ctx.shadowColor="white",ctx.fillText("Cybercloud Studios",c.width/2,c.height/2),ctx.font="50px pixel",ctx.fillText("Presents",c.width/2,c.height/2+50),ctx.shadowBlur=0,this.opacity<1&&this.transisionIn&&(this.opacity+=dt*this.transisionSpeed,this.opacity>=1&&(this.opacity=1,this.transisionIn=!1)),this.counter>this.duration&&!this.transisionIn&&(this.opacity-=dt*this.transisionSpeed,this.opacity<=0))return this.opacity=0,!0;this.counter+=dt}}