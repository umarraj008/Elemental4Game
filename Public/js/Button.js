class Button {
    constructor(x1,y1,width1,height1, t) {
        this.x = x1;
        this.y = y1;
        this.width = width1;
        this.height = height1;
        this.text = t;
        this.backgroundColor = "White";
        this.hoverColor = "red";
        this.textColor = "black";
        this.font = "20px Arial";
        this.textAlign = "center";
        this.selected = false;
    }

    draw(dt,mx,my) {

        if (this.mouseOver(mx,my)) {
            ctx.fillStyle = this.hoverColor;
        } else {
            ctx.fillStyle = this.backgroundColor;
        }

        ctx.fillRect(this.x,this.y,this.width,this.height);

        ctx.font = this.font;
        ctx.fillStyle = this.textColor;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height / 2);

        if (this.selected) {
            ctx.strokeStyle= "lime";
            ctx.strokeRect(this.x,this.y,this.width,this.height);
        }
    }

    mouseOver(mx,my) {
        if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height) {
            c.style.cursor = "pointer";
            return true;
        } else {
            c.style.cursor = "default";
            return false;
        }
    }

    setX (x1){this.x = x1;}
    setY (y2){this.y = y2;}
    setWidth (w1){this.width = w1;}
    setHeight (h1){this.height = h1;}
    setText (t1){this.text = t1;}
    setBackgroundColor (bc1){this.backgroundColor = bc1;}
    setHoverColor (hc1){this.hoverColor = hc1;}
    setTextColor (tc1){this.textColor = tc1;}
    setFont (f1){this.font = f1;}
    setTextAlign (ta1){this.textAlign = ta1;}

}