class ErrorMessageHandler{
    constructor(){
        this.errors = [];
        this.deleteQueue = [];
    }
    draw(){
        for(let i = 0; i < this.errors.length; i++){
            if(this.errors[i].draw()){
                this.deleteQueue.push(i);
                continue;
            }
        }
        this.deleteQueue.forEach(dI => {
            this.errors.splice(dI,1);
        });
        this.deleteQueue = [];
    }
    makeError(text){
        this.errors.push(new ErrorMessage(text));
    }
}