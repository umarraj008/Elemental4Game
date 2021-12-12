class Button {
    constructor(x1,y1,width1,height1, t, style) {
        this.x = x1;
        this.y = y1;
        this.width = width1;
        this.height = height1;
        this.text = t;
        this.backgroundColor = "White";
        this.hoverColor = "red";
        this.textColor = "black";
        this.font = "30px pixel";
        this.textAlign = "center";
        this.selected = false;
        // this.disabled = (d == null || d == undefined) ? false : d;
        this.disabledColor = "rgb(100,100,100)";
        this.bought = false;
        this.boughtColor = "rgb(255,0,0)";
        // this.buyButton = (b == null || b == undefined) ? false : b;
        this.canBuy = false;
        this.style = (style == null || style == undefined) ? "normal" : style;
    }

    draw(dt,mx,my) {

        if (this.style == "bought") {//this.buyButton && this.bought) { //bought button
            //fill
            ctx.fillStyle = "#afe45a";
            ctx.fillRect(this.x+45, this.y+45, this.width-90,this.height-90);
    
            //corner
            ctx.drawImage(buttonSpriteSheet, 0, 400, 50, 50, this.x, this.y, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 50, 400, 50, 50, this.x+this.width-50, this.y, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 100, 400, 50, 50, this.x, this.y+this.height-50, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 150, 400, 50, 50, this.x+this.width-50, this.y+this.height-50, 50, 50);
    
            //edge
            ctx.drawImage(buttonSpriteSheet, 0, 450, 50, 50, this.x+50, this.y, this.width-100, 50);
            ctx.drawImage(buttonSpriteSheet, 50, 450, 50, 50, this.x+this.width-50, this.y+50, 50, this.height-100);
            ctx.drawImage(buttonSpriteSheet, 100, 450, 50, 50, this.x+50, this.y+this.height-50, this.width-100, 50);
            ctx.drawImage(buttonSpriteSheet, 150, 450, 50, 50, this.x, this.y+50, 50, this.height-100);
        } else if (this.style == "disabled" || this.style == "cantBuy") {//this.disabled || !this.canBuy) {//disabled
            //fill
            ctx.fillStyle = "#5f5f5f";
            ctx.fillRect(this.x+45, this.y+45, this.width-90,this.height-90);
    
            //corner
            ctx.drawImage(buttonSpriteSheet, 0, 200, 50, 50, this.x, this.y, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 50, 200, 50, 50, this.x+this.width-50, this.y, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 100, 200, 50, 50, this.x, this.y+this.height-50, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 150, 200, 50, 50, this.x+this.width-50, this.y+this.height-50, 50, 50);
    
            //edge
            ctx.drawImage(buttonSpriteSheet, 0, 250, 50, 50, this.x+50, this.y, this.width-100, 50);
            ctx.drawImage(buttonSpriteSheet, 50, 250, 50, 50, this.x+this.width-50, this.y+50, 50, this.height-100);
            ctx.drawImage(buttonSpriteSheet, 100, 250, 50, 50, this.x+50, this.y+this.height-50, this.width-100, 50);
            ctx.drawImage(buttonSpriteSheet, 150, 250, 50, 50, this.x, this.y+50, 50, this.height-100);
        } else if (this.style == "selected") {//this.selected) {//selected
            //fill
            ctx.fillStyle = "#e45aa8";
            ctx.fillRect(this.x+45, this.y+45, this.width-90,this.height-90);
    
            //corner
            ctx.drawImage(buttonSpriteSheet, 0, 300, 50, 50, this.x, this.y, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 50, 300, 50, 50, this.x+this.width-50, this.y, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 100, 300, 50, 50, this.x, this.y+this.height-50, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 150, 300, 50, 50, this.x+this.width-50, this.y+this.height-50, 50, 50);
    
            //edge
            ctx.drawImage(buttonSpriteSheet, 0, 350, 50, 50, this.x+50, this.y, this.width-100, 50);
            ctx.drawImage(buttonSpriteSheet, 50, 350, 50, 50, this.x+this.width-50, this.y+50, 50, this.height-100);
            ctx.drawImage(buttonSpriteSheet, 100, 350, 50, 50, this.x+50, this.y+this.height-50, this.width-100, 50);
            ctx.drawImage(buttonSpriteSheet, 150, 350, 50, 50, this.x, this.y+50, 50, this.height-100);
        } else if (this.mouseOver(mx,my)) {//this.mouseOver(mx,my)) { //HOVER
            //fill
            ctx.fillStyle = "#2d6172";
            ctx.fillRect(this.x+45, this.y+45, this.width-90,this.height-90);
    
            //corner
            ctx.drawImage(buttonSpriteSheet, 0, 100, 50, 50, this.x, this.y, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 50, 100, 50, 50, this.x+this.width-50, this.y, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 100, 100, 50, 50, this.x, this.y+this.height-50, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 150, 100, 50, 50, this.x+this.width-50, this.y+this.height-50, 50, 50);
    
            //edge
            ctx.drawImage(buttonSpriteSheet, 0, 150, 50, 50, this.x+50, this.y, this.width-100, 50);
            ctx.drawImage(buttonSpriteSheet, 50, 150, 50, 50, this.x+this.width-50, this.y+50, 50, this.height-100);
            ctx.drawImage(buttonSpriteSheet, 100, 150, 50, 50, this.x+50, this.y+this.height-50, this.width-100, 50);
            ctx.drawImage(buttonSpriteSheet, 150, 150, 50, 50, this.x, this.y+50, 50, this.height-100);
        } else if (this.style == "normal") { //REGULAR
            //fill
            ctx.fillStyle = "#5ac2e4";
            ctx.fillRect(this.x+45, this.y+45, this.width-90,this.height-90);
    
            //corner
            ctx.drawImage(buttonSpriteSheet, 0, 0, 50, 50, this.x, this.y, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 50, 0, 50, 50, this.x+this.width-50, this.y, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 100, 0, 50, 50, this.x, this.y+this.height-50, 50, 50);
            ctx.drawImage(buttonSpriteSheet, 150, 0, 50, 50, this.x+this.width-50, this.y+this.height-50, 50, 50);
    
            //edge
            ctx.drawImage(buttonSpriteSheet, 0, 50, 50, 50, this.x+50, this.y, this.width-100, 50);
            ctx.drawImage(buttonSpriteSheet, 50, 50, 50, 50, this.x+this.width-50, this.y+50, 50, this.height-100);
            ctx.drawImage(buttonSpriteSheet, 100, 50, 50, 50, this.x+50, this.y+this.height-50, this.width-100, 50);
            ctx.drawImage(buttonSpriteSheet, 150, 50, 50, 50, this.x, this.y+50, 50, this.height-100);
        }

        ctx.font = this.font;
        ctx.fillStyle = this.textColor;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height / 2+5);

        // if (this.selected) {
        //     ctx.strokeStyle= "lime";
        //     ctx.lineWidth = "4px";
        //     ctx.strokeRect(this.x,this.y,this.width,this.height);
        // }

       
    }

    mouseOver(mx,my) {
        if (this.disabled) return false;

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