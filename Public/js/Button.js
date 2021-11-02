class Button {
    constructor(x1,y1,width1,height1, t) {
        this.x = x1;
        this.y = y1;
        this.width = width1;
        this.height = height1;
        this.text = t;
        this.backgroundColor = "";
        this.hoverColor = "";
    }

    draw(dt,mx,my) {

        if (this.mouseOver(mx,my)) {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = '#FFFFFF';
        }

        ctx.fillRect(this.x,this.y,this.width,this.height);

        ctx.fillStyle = "lime";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height / 2);

    }

    mouseOver(mx,my) {
        if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height) {
            return true;
        } else {
            return false;
        }
    }
}