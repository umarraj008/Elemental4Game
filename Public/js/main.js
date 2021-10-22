const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

var scene = 0;
var dt = 0, lastTime = 0
var mouseX, mouseY;
var sceneManager = new SceneManager(0);

function setup() {
    // c.width = 1920;
    // c.height = 1080;

    resizeWindow();
}

function main(time = 0) {
    requestAnimationFrame(main);
    dt = time - lastTime;
    lastTime = time;
    
    sceneManager.run(dt);
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
}

setup();
main();