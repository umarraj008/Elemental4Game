const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

var scene = 0;
var dt = 0;
var mouseX, mouseY;
var sceneManager = new SceneManager(-1);
var frameRate = 60;
var frameInterval = 1000/frameRate;
var now;
var elapsed;
var then = Date.now();

const airBackground = new Image();
const earthBackground = new Image();
const fireBackground = new Image();
const waterBackground = new Image();
const wizards = new Image();
const platform = new Image();
const fireSpriteSheet = new Image();
const waterSpriteSheet = new Image();
const earthSpriteSheet = new Image();
const airSpriteSheet = new Image();
const fireCharacter = new Image();
const waterCharacter = new Image();
const earthCharacter = new Image();
const airCharacter = new Image();
const earthMapCloud1 = new Image();
const earthMapCloud2 = new Image();
const earthMapHill1 = new Image();
const earthMapHill2 = new Image();
const earthMapHill3 = new Image();
const fireMapCloudSingle = new Image();
const fireMapCloud1 = new Image();
const fireMapCloud2 = new Image();
const fireMapCloud3 = new Image();
const fireMapCloud4 = new Image();
const fireMapVolcanoLava = new Image();
const fireMapVolcano = new Image();
const waterMapCloudSingle = new Image();
const waterMapCloud1 = new Image();
const waterMapCloud2 = new Image();
const waterMapCloud3 = new Image();
const waterMapCloud4 = new Image();
const waterMapMountains = new Image();

airBackground.src =        "resources/images/AirMapFull.png";
earthBackground.src =      "resources/images/EarthMapFull.png";
fireBackground.src =       "resources/images/FireMapFull.png";
waterBackground.src =      "resources/images/WaterMapFull.png";
wizards.src =              "resources/images/wizards.png";
platform.src =             "resources/images/platform1.png";
fireSpriteSheet.src =      "resources/images/fireSpriteSheet.png";
waterSpriteSheet.src =     "resources/images/waterSpriteSheet.png";
earthSpriteSheet.src =     "resources/images/earthSpriteSheet.png";
airSpriteSheet.src =       "resources/images/airSpriteSheet.png";
fireCharacter.src =        "resources/images/fireCharacter.png";
waterCharacter.src =       "resources/images/waterCharacter.png";
earthCharacter.src =       "resources/images/earthCharacter.png";
airCharacter.src =         "resources/images/airCharacter.png";
earthMapCloud1.src =       "resources/images/EarthMap/EarthMap_Cloud1.png";
earthMapCloud2.src =       "resources/images/EarthMap/EarthMap_Cloud2.png";
earthMapHill1.src =        "resources/images/EarthMap/EarthMap_Hill1.png";
earthMapHill2.src =        "resources/images/EarthMap/EarthMap_Hill2.png";
earthMapHill3.src =        "resources/images/EarthMap/EarthMap_Hill3.png";
fireMapCloudSingle.src =   "resources/images/FireMap/FireMap_Cloud_Single.png";
fireMapCloud1.src =        "resources/images/FireMap/FireMap_Cloud1.png";
fireMapCloud2.src =        "resources/images/FireMap/FireMap_Cloud2.png";
fireMapCloud3.src =        "resources/images/FireMap/FireMap_Cloud3.png";
fireMapCloud4.src =        "resources/images/FireMap/FireMap_Cloud4.png";
fireMapVolcanoLava.src =   "resources/images/FireMap/FireMap_Volcano_Lava.png";
fireMapVolcano.src =       "resources/images/FireMap/FireMap_Volcano.png";
waterMapCloudSingle.src =  "resources/images/WaterMap/WaterMap_Cloud_Single.png";
waterMapCloud1.src =       "resources/images/WaterMap/WaterMap_Cloud1.png";
waterMapCloud2.src =       "resources/images/WaterMap/WaterMap_Cloud2.png";
waterMapCloud3.src =       "resources/images/WaterMap/WaterMap_Cloud3.png";
waterMapCloud4.src =       "resources/images/WaterMap/WaterMap_Cloud4.png";
waterMapMountains.src =    "resources/images/WaterMap/WaterMap_Mountains.png";

function setup() {
    // c.width = 1920;
    // c.height = 1080;
    ctx.imageSmoothingEnabled = false;
    resizeWindow();
    main();
}

function main() {
    frameInterval = 1000/frameRate;
    requestAnimationFrame(main);
    
    now = Date.now();
    elapsed = now - then;
    dt = elapsed;
    
    if (elapsed > frameInterval) {
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

function loginButtonPressed() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    login(email, password);
}

setup();