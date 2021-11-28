const socket = io();

socket.on("connect", function() {
    console.log("connected to server");

    let sessionEmail = window.sessionStorage.getItem("email");
    let sessionFirstName = window.sessionStorage.getItem("firstName");
    let sessionLastName = window.sessionStorage.getItem("lastName");
    let sessionGamerTag = window.sessionStorage.getItem("gamerTag");
    let sessionDOB = window.sessionStorage.getItem("DOB");

    if (sessionEmail != null && sessionEmail != undefined && 
        sessionFirstName != null && sessionFirstName != undefined && 
        sessionLastName != null && sessionLastName != undefined && 
        sessionGamerTag != null && sessionGamerTag != undefined && 
        sessionDOB != null && sessionDOB != undefined) {

        location.href = "index.html";
    } 
});

socket.on("disconnect", function() {
    console.log("disconnected to server");
});

socket.on("register-success", function(data) {
    sessionStorage.setItem("firstName", data.firstName);
    sessionStorage.setItem("lastName", data.lastName);
    sessionStorage.setItem("DOB", data.DOB);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("gamerTag", data.gamerTag);
    sessionStorage.setItem("gamesWon", data.gamesWon);
    sessionStorage.setItem("gamesLost", data.gamesLost);
    sessionStorage.setItem("xpLevel", data.xpLevel);
    sessionStorage.setItem("perksUnlocked", data.perksUnlocked);
    
    location.href = "index.html";
});

socket.on("register-failed", function(message) {
    console.log(message);
});

function register(firstName,lastName,email,DOB,gamerTag,password) {
    let data = {firstName:firstName, lastName:lastName, email:email, DOB:DOB, gamerTag:gamerTag, password:password};
    socket.emit("register", data);
}

function registerButtonPressed() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let DOB = document.getElementById("DOB").value;
    let gamerTag = document.getElementById("gamerTag").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    // register();
    if(password == confirmPassword) {
        register(firstName,lastName,email,DOB,gamerTag,password);
    } else {
        console.log("passwords dont match");
    }
}