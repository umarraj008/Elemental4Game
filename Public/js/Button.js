class Button {
    constructor(x1,y1,width1,height1) {
        this.x = x1;
        this.y = y1;
        this.width = width1;
        this.height = height1;
    }

    draw(dt,mx,my) {

        if (this.mouseOver(mx,my)) {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = '#FFFFFF';
        }

        ctx.fillRect(this.x,this.y,this.width,this.height);


    }

    mouseOver(mx,my) {
        if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height) {
            return true;
        } else {
            return false;
        }
    }
}