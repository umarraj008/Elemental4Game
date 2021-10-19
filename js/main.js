const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

function setup() {
    c.width = 1920;
    c.height = 1080;
}

function main() {
    requestAnimationFrame(main);
    
    //test
    ctx.fillStyle = "lime";
    ctx.fillRect(0,0,500,500);
}

setup();
main();