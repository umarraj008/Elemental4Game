const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

var scene = 0;
var dt = 0, lastTime = 0;
var sceneManager = new SceneManager(0);

function setup() {
    c.width = 1920;
    c.height = 1080;
}

function main(time = 0) {
    requestAnimationFrame(main);
    dt = time - lastTime;
    lastTime = time;
    
    sceneManager.run(dt);
}

setup();
main();