const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

var fireSpriteSheet;
var waterSpriteSheet;
var earthSpriteSheet;
var airSpriteSheet;

var sceneManager = new SceneManager(-2);
const loader = new Loader(36,0);
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
const allCharacters =        loader.loadImage("resources/images/allCharacters.png");

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
};

function setup() {
    // c.width = 1920;
    // c.height = 1080;
    ctx.imageSmoothingEnabled = false;
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
        sendMessageTextChat();
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