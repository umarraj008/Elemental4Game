class ErrorMessage{constructor(t){this.text=t,this.opacity=1,this.counter=0}draw(){return ctx.fillStyle="rgba(0,0,0,"+this.opacity+")",ctx.fillRect(c.width/2-294,26,600,100),ctx.fillStyle="rgba(255,255,255,"+this.opacity+")",ctx.fillRect(c.width/2-300,20,600,100),ctx.fillStyle="rgba(0,0,0,"+this.opacity+")",ctx.textAlign="center",ctx.font="30px pixel",ctx.fillText(this.text,c.width/2,70),this.counter>=3e3&&(this.opacity-=.02,this.opacity<=0)||(this.counter+=dt,!1)}}