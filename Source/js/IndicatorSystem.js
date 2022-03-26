class IndicatorSystem {

    constructor (){
        this.indicators = [];
        this.deleteQueue = [];
    }

    draw (){
        for (let i = 0; i< this.indicators.length; i++){
            if (this.indicators[i].draw()){
                this.deleteQueue.push(i);
                continue
            }
        }
        this.deleteQueue.forEach(dI => {
            this.indicators.splice(dI,1);
        });
        this.deleteQueue = [];
    }
    makeIndicator(text,x,y,color){
        this.indicators.push(new Indicator(text,x,y,color));

    }
}