const express = require("express");
const app = express();
const port = 3000;
const address = "localhost";
const server = app.listen(port, () => {
    console.log("Server has started.");
    console.log("Listening at: " + address + ":" + port);
});
app.use(express.static("html"));
const IO = require("socket.io")(server);

IO.sockets.on("connection", function(socket) {
    console.log("player has connected");
});