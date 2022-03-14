const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

var fireSpriteSheet;
var waterSpriteSheet;
var earthSpriteSheet;
var airSpriteSheet;

//lanugage setup
var LANGUAGE = [];
var CURRENT_LANGUAGE = {};

var request = new XMLHttpRequest();
request.open("GET", "../resources/languages.json", false);
request.send(null)
LANGUAGE = JSON.parse(request.responseText);
let l = sessionStorage.getItem("language");
if (l != null && l != undefined) {
    switch(l) {
        case '0': CURRENT_LANGUAGE = LANGUAGE.english; break;
        case '1': CURRENT_LANGUAGE = LANGUAGE.spanish; break;
        case '2': CURRENT_LANGUAGE = LANGUAGE.french; break;
        case '3': CURRENT_LANGUAGE = LANGUAGE.italian; break;
        case '4': CURRENT_LANGUAGE = LANGUAGE.chinese; break;
        case '5': CURRENT_LANGUAGE = LANGUAGE.japanese; break;
    }
} else {
    CURRENT_LANGUAGE = language.english;
}

var sceneManager = new SceneManager(-2);
const loader = new Loader(42,0);//DONT FORGET TO CHANGE THE TOTAL WHEN ADDING MORE IMAGES
loader.audioLoadingFinished = true; //REMOVE WHEN AUDIO IS ADDED

const airBackground =        loader.loadImage("resources/images/AirMapFull.png");
const earthBackground =      loader.loadImage("resources/images/EarthMapFull.png");
const fireBackground =       loader.loadImage("resources/images/FireMapFull.png");
const waterBackground =      loader.loadImage("resources/images/WaterMapFull.png");
const wizards =              loader.loadImage("resources/images/wizards.png");
const platform =             loader.loadImage("resources/images/platform1.png");
var fireSpriteSheet =        loader.loadImage("resources/images/fireSpriteSheet.png");
var waterSpriteSheet =       loader.loadImage("resources/images/waterSpriteSheet.png");
var earthSpriteSheet =       loader.loadImage("resources/images/earthSpriteSheet.png");
var airSpriteSheet =         loader.loadImage("resources/images/airSpriteSheet.png");
const fireCharacter =        loader.loadImage("resources/images/fireCharacter.png");
const waterCharacter =       loader.loadImage("resources/images/waterCharacter.png");
const earthCharacter =       loader.loadImage("resources/images/earthCharacter.png");
const airCharacter =         loader.loadImage("resources/images/airCharacter.png");
const earthMapCloud1 =       loader.loadImage("resources/images/EarthMap/EarthMap_Cloud1.png");
const earthMapCloud2 =       loader.loadImage("resources/images/EarthMap/EarthMap_Cloud2.png");
const earthMapHill1 =        loader.loadImage("resources/images/EarthMap/EarthMap_Hill1.png");
const earthMapHill2 =        loader.loadImage("resources/images/EarthMap/EarthMap_Hill2.png");
const earthMapHill3 =        loader.loadImage("resources/images/EarthMap/EarthMap_Hill3.png");
const fireMapCloudSingle =   loader.loadImage("resources/images/FireMap/FireMap_Cloud_Single.png");
const fireMapCloud1 =        loader.loadImage("resources/images/FireMap/FireMap_Cloud1.png");
const fireMapCloud2 =        loader.loadImage("resources/images/FireMap/FireMap_Cloud2.png");
const fireMapCloud3 =        loader.loadImage("resources/images/FireMap/FireMap_Cloud3.png");
const fireMapCloud4 =        loader.loadImage("resources/images/FireMap/FireMap_Cloud4.png");
const fireMapVolcanoLava =   loader.loadImage("resources/images/FireMap/FireMap_Volcano_Lava.png");
const fireMapVolcano =       loader.loadImage("resources/images/FireMap/FireMap_Volcano.png");
const waterMapCloudSingle =  loader.loadImage("resources/images/WaterMap/WaterMap_Cloud_Single.png");
const waterMapCloud1 =       loader.loadImage("resources/images/WaterMap/WaterMap_Cloud1.png");
const waterMapCloud2 =       loader.loadImage("resources/images/WaterMap/WaterMap_Cloud2.png");
const waterMapCloud3 =       loader.loadImage("resources/images/WaterMap/WaterMap_Cloud3.png");
const waterMapCloud4 =       loader.loadImage("resources/images/WaterMap/WaterMap_Cloud4.png");
const waterMapMountains =    loader.loadImage("resources/images/WaterMap/WaterMap_Mountains.png");
const titleImage =           loader.loadImage("resources/images/elemental4LTitle.png");
const buttonSpriteSheet =    loader.loadImage("resources/images/buttonSpriteSheet.png");
const rocks =                loader.loadImage("resources/images/rocks.png");
const panelSpriteSheet =     loader.loadImage("resources/images/panelSpriteSheet.png");
const waterMapBlur =         loader.loadImage("resources/images/WaterMapFullBlur.png");
const fireMapBlur =          loader.loadImage("resources/images/FireMapFullBlur.png");
const earthMapBlur =         loader.loadImage("resources/images/EarthMapFullBlur.png");
const airMapBlur =           loader.loadImage("resources/images/AirMapFullBlur.png");
const allCharacters =        loader.loadImage("resources/images/AllCharacters.png");
const icons =                loader.loadImage("resources/images/icons.png");

var dt = 0;
var mouseX, mouseY;
var frameRate = 60;
var frameInterval = 1000/frameRate;
var now;
var elapsed;
var then = Date.now();
var FONT = "pixel";
var pauseDrawing = false;
var showLogin = false;
var SETTINGS = {
    frameRate: 60,
    windParticles: true,
    debrisParticles: true,
    movingBackground: true,
    textIndicators: true,
    fullscreen: false,
    contrast: 100,
    colorBlindness: 0,
    language: 0,
};

function setup() {
    // c.width = 1920;
    // c.height = 1080;

    let frameRate = sessionStorage.getItem("frameRate");
    let windParticles = sessionStorage.getItem("windParticles");
    let debrisParticles = sessionStorage.getItem("debrisParticles");
    let movingBackground = sessionStorage.getItem("movingBackground");
    let textIndicators = sessionStorage.getItem("textIndicators");
    let fullscreen = sessionStorage.getItem("fullscreen");
    let contrast = sessionStorage.getItem("contrast");
    let colorBlindness = sessionStorage.getItem("colorBlindness");
    let language = sessionStorage.getItem("language");
    
    if (frameRate        != null && frameRate        != undefined) SETTINGS.frameRate =        frameRate; 
    if (windParticles    != null && windParticles    != undefined) SETTINGS.windParticles =    windParticles; 
    if (debrisParticles  != null && debrisParticles  != undefined) SETTINGS.debrisParticles =  debrisParticles; 
    if (movingBackground != null && movingBackground != undefined) SETTINGS.movingBackground = movingBackground; 
    if (textIndicators   != null && textIndicators   != undefined) SETTINGS.textIndicators =   textIndicators; 
    if (contrast         != null && contrast         != undefined) SETTINGS.contrast =         contrast; 
    if (colorBlindness   != null && colorBlindness   != undefined) SETTINGS.colorBlindness =   colorBlindness; 
    if (language         != null && language         != undefined) SETTINGS.language =         language; 
    // if (fullscreen       != null && fullscreen       != undefined) SETTINGS.fullscreen =       fullscreen; 

    ctx.imageSmoothingEnabled = false;
    sceneManager.updateAllText();
    //updateAllText();
    resizeWindow();
    main();
}

function main() {
    frameInterval = 1000/SETTINGS.frameRate;
    requestAnimationFrame(main);
    
    now = Date.now();
    elapsed = now - then;
    dt = elapsed;
    
    if (elapsed > frameInterval && !pauseDrawing) {
        then = now - (elapsed % frameInterval);
        sceneManager.run();
    }
}

function resizeWindow() {
    var offset = 0;
    c.style.left = 0;
    offset = (window.innerWidth - c.clientWidth) / 2;
    c.style.left = offset + "px";
}

//event listener for window resizing
window.onresize = resizeWindow; 

//event listening for mouse move
window.onmousemove = function(e) {
    e = e || window.event;
    
    var canvasRect = canvas.getBoundingClientRect()
    var scaleX = canvas.width / canvasRect.width;   
    var scaleY = canvas.height / canvasRect.height; 
    
    mouseX = Math.abs((e.clientX - canvasRect.left) * scaleX);
    mouseY = Math.abs((e.clientY - canvasRect.top) * scaleY);    
}

//event listening for mouse click
window.onclick = function(e) {
    sceneManager.mouseClick();
    //console.log("test2");
}

window.onkeydown = function (e) {
    if (e.keyCode == 13) {
        if (sceneManager.scene == -1) {
            loginButtonPressed();
        } else if (sceneManager.scene == 6 || sceneManager.scene == 7) {
            sendMessageTextChat();
        }
    }
}

document.onvisibilitychange  = function () {
    if (document.visibilityState == "hidden") {
        pauseDrawing = true;
        dt = 0;
        elapsed = 0;
        console.log("paused");
    } else {
        pauseDrawing = false;
    }
}

function loginButtonPressed() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    login(email, password);
}

setup();