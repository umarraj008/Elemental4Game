class Credits {
    constructor() {
        this.gradient = ctx.createLinearGradient(0, 0, c.width, 0);
        this.gradient.addColorStop(0, "rgba(0,0,0,0.9)");
        this.gradient.addColorStop(0.5, "rgba(0,0,0,0.9)");
        this.gradient.addColorStop(1, "rgba(0,0,0,0)");

        this.text = [
            {string: "Cybercloud Studios", font: "80px pixel"},
            {string: "", font: "30px pixel"},
            {string: "THE TEAM", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Adam Hatton", font: "30px pixel"},
            {string: "Aisha Warsame", font: "30px pixel"},
            {string: "Anibal Rodriguez Bravo De Laguna", font: "30px pixel"},
            {string: "Asukulu Ndela", font: "30px pixel"},
            {string: "Christian Nielsen", font: "30px pixel"},
            {string: "Jaskamal Kaur", font: "30px pixel"},
            {string: "Mohammed Sadhak", font: "30px pixel"},
            {string: "Satbir Lidder", font: "30px pixel"},
            {string: "Shadman Hoque", font: "30px pixel"},
            {string: "Umar Rajput", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "PROGRAMMERS", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Satbir Lidder", font: "30px pixel"},
            {string: "Shadman Hoque", font: "30px pixel"},
            {string: "Umar Rajput", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "BACKGROUNDS", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Ice, Lava and Air Background", font: "30px pixel"},
            {string: "Glacial Mountains: Parallax Background by Vicente Nitti (www.vnitti.itch.io)", font: "30px pixel"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px pixel"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px pixel"},
            {string: "Parts of this work was remixed.", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Earth Background", font: "30px pixel"},
            {string: "Grassy Mountains: Parallax Background by Vicente Nitti (www.vnitti.itch.io)", font: "30px pixel"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px pixel"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px pixel"},
            {string: "Parts of this work was remixed.", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "CHARACTERS", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Fire Character", font: "30px pixel"},
            {string: "Elementals: Fire Knight by Chierit (www.chierit.itch.io)", font: "30px pixel"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px pixel"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Water Character", font: "30px pixel"},
            {string: "Elementals: Water Priestess by Chierit (www.chierit.itch.io)", font: "30px pixel"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px pixel"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Earth Character", font: "30px pixel"},
            {string: "Elementals: Ground Monk by Chierit (www.chierit.itch.io)", font: "30px pixel"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px pixel"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Air Character", font: "30px pixel"},
            {string: "Elementals: Wind Hashashin by Chierit (www.chierit.itch.io)", font: "30px pixel"},
            {string: "Licensed under Creative Commons: By Attribution 4.0 License", font: "30px pixel"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "FONTS", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Title Font", font: "30px pixel"},
            {string: "True Type Font: Pixel Font-7 version 1.0 by unknown (www.styleseven.com)", font: "30px pixel"},
            {string: "Accessed on: https://www.1001fonts.com/", font: "30px pixel"},
            {string: "Licensed under Free For Commercial Use License (FFC)", font: "30px pixel"},
            {string: "https://freeforcommercialuse.net/license/", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "UI", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Buttons and Panels", font: "30px pixel"},
            {string: "Wenrexa Assets GUI Dark Miko by Wenrexa (www.wenrexa.itch.io/)", font: "30px pixel"},
            {string: "Licensed under Creative Commons Zero v1.0 Universal", font: "30px pixel"},
            {string: "https://creativecommons.org/publicdomain/zero/1.0/", font: "30px pixel"},
            {string: "Parts of this work was remixed.", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Buttons", font: "30px pixel"},
            {string: "UI STARTER PACK by Pauboeg (www.pauboeg.itch.io/)", font: "30px pixel"},
            {string: "Licensed under Creative Commons Zero v1.0 Universal", font: "30px pixel"},
            {string: "https://creativecommons.org/publicdomain/zero/1.0/", font: "30px pixel"},
            {string: "Parts of this work was remixed.", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "SOUNDTRACK", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Menu Music", font: "30px pixel"},
            {string: "Music: [Tavern Loop One] by Alexander Nakarada (www.serpentsoundstudios.com)", font: "30px pixel"},
            {string: "Licensed under Creative Commons BY Attribution 4.0 License", font: "30px pixel"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Game Music", font: "30px pixel"},
            {string: "Music: [Mjolnir] by Alexander Nakarada (www.serpentsoundstudios.com)", font: "30px pixel"},
            {string: "Licensed under Creative Commons BY Attribution 4.0 License", font: "30px pixel"},
            {string: "http://creativecommons.org/licenses/by/4.0/", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "This game uses these sounds from freesound:", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Win", font: "30px pixel"},
            {string: "Jingle_Achievement_00.wav by LittleRobotSoundFactory ( http://freesound.org/270404/ ) licensed under CCBYNC 3.0", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Lose", font: "30px pixel"},
            {string: "Jingle_Lose_00.wav by LittleRobotSoundFactory ( http://freesound.org/s/270403/ ) licensed under CCBYNC 3.0", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "SOUND EFFECTS", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Activate Perk", font: "30px pixel"},
            {string: "Button Press", font: "30px pixel"},
            {string: "Button Back", font: "30px pixel"},
            {string: "Hit", font: "30px pixel"},
            {string: "These sound effects were from (https://sfxr.me/) licensed under Public Domain Mark 1.0", font: "30px pixel"},
            {string: "https://creativecommons.org/publicdomain/mark/1.0/", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Sound Icon", font: "30px pixel"},
            {string: "Image: speaker-filled-audio-tool.com", font: "30px pixel"},
            {string: "This cover has been designed using resources from Flaticon.com", font: "30px pixel"},
            {string: "https://www.flaticon.com/free-icons/speaker", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Full Credits Can be Found On Github:", font: "30px pixel"},
            {string: "https://github.com/umarraj008/Elemental4Game", font: "30px pixel"},
            {string: "", font: "30px pixel"},
            {string: "Thanks For Playing!", font: "30px pixel"},
        ];

        this.scrollOffset = 0;
    }

    draw() {
        sceneManager.maps.drawTransition(false);
        
        ctx.fillStyle = this.gradient;
        ctx.fillRect(0,0,c.width,c.height);
        ctx.textAlign = "left";
        let offY = 0;
        for (let i = 0; i < this.text.length; i++) {
            if (this.text[i].string <= 0) {
                offY += 60;
                continue;
            }

            ctx.fillStyle = "white";
            ctx.font = this.text[i].font;
            ctx.fillText(this.text[i].string, 50, c.height/2 + offY + this.scrollOffset);

            offY += 30;
        }

        this.scrollOffset -= 0.07 * dt;
        sceneManager.creditBackButton.draw(dt, mouseX, mouseY);

        if (this.scrollOffset <= -4400) {
            sceneManager.camera.transitionTo(2,0.005); 
        }
    }
}