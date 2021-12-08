class Credits {
    constructor() {
        this.text = [
            {string: "Cybercloud Studios", font: "80px Arial"},
            {string: "", font: "30px Arial"},
            {string: "THE TEAM", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Adam Hatton", font: "30px Arial"},
            {string: "Aisha Warsame", font: "30px Arial"},
            {string: "Anibal Rodriguez Bravo De Laguna", font: "30px Arial"},
            {string: "Asukulu Ndela", font: "30px Arial"},
            {string: "Christian Nielsen", font: "30px Arial"},
            {string: "Jaskamal Kaur", font: "30px Arial"},
            {string: "Mohammed Sadhak", font: "30px Arial"},
            {string: "Satbir Lidder", font: "30px Arial"},
            {string: "Shadman Hoque", font: "30px Arial"},
            {string: "Umar Rajput", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Programmers", font: "30px Arial"},
            {string: "Satbir Lidder", font: "30px Arial"},
            {string: "Shadman Hoque", font: "30px Arial"},
            {string: "Umar Rajput", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "BACKGROUNDS", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Ice, Lava and Air Background", font: "30px Arial"},
            {string: "Glacial Mountains: Parallax Background by Vicente Nitti (www.vnitti.itch.io)", font: "30px Arial"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px Arial"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px Arial"},
            {string: "Parts of this work was remixed.", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Earth Background", font: "30px Arial"},
            {string: "Grassy Mountains: Parallax Background by Vicente Nitti (www.vnitti.itch.io)", font: "30px Arial"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px Arial"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px Arial"},
            {string: "Parts of this work was remixed.", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "CHARACTERS", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Fire Character", font: "30px Arial"},
            {string: "Elementals: Fire Knight by Chierit (www.chierit.itch.io)", font: "30px Arial"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px Arial"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Water Character", font: "30px Arial"},
            {string: "Elementals: Water Priestess by Chierit (www.chierit.itch.io)", font: "30px Arial"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px Arial"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Earth Character", font: "30px Arial"},
            {string: "Elementals: Ground Monk by Chierit (www.chierit.itch.io)", font: "30px Arial"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px Arial"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Air Character", font: "30px Arial"},
            {string: "Elementals: Wind Hashashin by Chierit (www.chierit.itch.io)", font: "30px Arial"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px Arial"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "FONTS", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Title Font", font: "30px Arial"},
            {string: "True Type Font: Pixel Font-7 version 1.0 by unknown (www.styleseven.com)", font: "30px Arial"},
            {string: "Accessed on: https://www.1001fonts.com/", font: "30px Arial"},
            {string: "Licensed under Free For Commercial Use License (FFC)", font: "30px Arial"},
            {string: "https://freeforcommercialuse.net/license/", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "UI", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Buttons and Panels", font: "30px Arial"},
            {string: "Wenrexa Assets GUI Dark Miko by Wenrexa (www.wenrexa.itch.io/)", font: "30px Arial"},
            {string: "Licensed under Creative Commons Zero v1.0 Universal", font: "30px Arial"},
            {string: "https://creativecommons.org/publicdomain/zero/1.0/", font: "30px Arial"},
            {string: "Parts of this work was remixed.", font: "30px Arial"},
            {string: "", font: "30px Arial"},
            {string: "Buttons", font: "30px Arial"},
            {string: "UI STARTER PACK by Pauboeg (www.pauboeg.itch.io/)", font: "30px Arial"},
            {string: "Licensed under Creative Commons Zero v1.0 Universal", font: "30px Arial"},
            {string: "https://creativecommons.org/publicdomain/zero/1.0/", font: "30px Arial"},
            {string: "Parts of this work was remixed.", font: "30px Arial"},
        ];

        this.scrollOffset = 0;
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,c.width,c.height);

        let offY = 0;
        for (let i = 0; i < this.text.length; i++) {
            if (this.text[i].string <= 0) {
                offY += 60;
                continue;
            }

            ctx.fillStyle = "white";
            ctx.font = this.text[i].font;
            ctx.fillText(this.text[i].string, c.width/2, c.height/2 + offY + this.scrollOffset);

            offY += 30;
        }

        this.scrollOffset -= 0.07 * dt;
        sceneManager.creditBackButton.draw(dt, mouseX, mouseY);

        if (this.scrollOffset <= -3300) {
            sceneManager.scene = 2;
        }
    }
}