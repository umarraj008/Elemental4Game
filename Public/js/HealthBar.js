class HealthBar{
    constructor(x,y,w,h,s,m){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.value = s/100;
        this.border = 2;
        this.maxValue = m/100
        this.change = false;
        this.changeTo;
        this.range1 = 70/100;
        this.range2 = 50/100;
        this.range3 = 25/100;
        this.color1 = "lime";
        this.color2 = "orange";
        this.color3 = "red";
        this.fillColor = this.color1;
    }
    draw(){
        if (this.change) {
            if (this.changeTo > this.value){
                this.value += 0.007; 
                if(this.value >= this.changeTo){
                    this.change = false;
                    this.value = this.changeTo;
                }
            } else if(this.changeTo < this.value){
                this.value -= 0.007;
                if (this.value <= this.changeTo){
                    this.change = false;
                    this.value = this.changeTo;
                }
            }
        }
        if (this.value <= this.range3 && this.value >=0){
            this.fillColor = this.color3
        }
        if (this.value <= this.range2 && this.value >= this.range3){
            this.fillColor = this.color2
        }
        if (this.value <= this.range1 && this.value >= this.range2){
            this.fillColor = this.color1
        }

        ctx.fillStyle = "black";
        ctx.fillRect(this.x - this.border, this.y -this.border, this.w + this.border * 2, this.h + this.border * 2);
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.w * (this.value/this.maxValue), this.h);
    }    
    changeValue(value){
        this.change = true;
        this.changeTo = value/100;

        if (this.changeTo <= 0) this.changeTo = 0;
    }
}