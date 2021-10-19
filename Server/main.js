//Constant variables for server
const express = require("express");
const app = express();
const port = 3000;
const address = "localhost";

//Server listening on address
const server = app.listen(port, () => {
    console.clear();
    console.log("Server has started.");
    console.log("Listening at: " + address + ":" + port);
});

app.use(express.static("../public"));
const io = require("socket.io")(server);

io.sockets.on("connection", function(socket) {
    console.log("player has connected");
});