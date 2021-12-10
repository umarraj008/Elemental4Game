class Panel {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        ctx.fillStyle = "#ededed";
        ctx.fillRect(this.x+95, this.y+95, this.w-190, this.h-190);

        ctx.drawImage(panelSpriteSheet, 0, 0, 100, 100, this.x, this.y, 100, 100);
        ctx.drawImage(panelSpriteSheet, 100, 0, 100, 100, this.x+this.w-100, this.y, 100, 100);
        ctx.drawImage(panelSpriteSheet, 200, 0, 100, 100, this.x, this.y+this.h-100, 100, 100);
        ctx.drawImage(panelSpriteSheet, 300, 0, 100, 100, this.x+this.w-100, this.y+this.h-100, 100, 100);
        
        ctx.drawImage(panelSpriteSheet, 0, 100, 100, 100, this.x+100, this.y, this.w-200, 100);
        ctx.drawImage(panelSpriteSheet, 100, 100, 100, 100, this.x+this.w-100, this.y+100, 100, this.h-200);
        ctx.drawImage(panelSpriteSheet, 200, 100, 100, 100, this.x+100, this.y+this.h-100, this.w-200, 100);
        ctx.drawImage(panelSpriteSheet, 300, 100, 100, 100, this.x, this.y+100, 100, this.h-200);
    }
}