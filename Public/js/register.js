const socket = io();
var registerPressed = false;

socket.on("connect", function() {
    // console.log("connected to server");

    let sessionEmail = window.sessionStorage.getItem("email");
    let sessionFirstName = window.sessionStorage.getItem("firstName");
    let sessionLastName = window.sessionStorage.getItem("lastName");
    let sessionGamerTag = window.sessionStorage.getItem("gamerTag");
    let sessionDOB = window.sessionStorage.getItem("DOB");

    if (sessionEmail != null || sessionEmail != undefined && 
        sessionFirstName != null || sessionFirstName != undefined && 
        sessionLastName != null || sessionLastName != undefined && 
        sessionGamerTag != null || sessionGamerTag != undefined && 
        sessionDOB != null || sessionDOB != undefined) {

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
    
    // console.log("Successfull Account Creation");
    if (window.confirm("Register Successful!")) {
        location.href = "index.html";    
    }
    // if (!alert("")) location.href = ;
});

socket.on("register-failed", function(message) {
    console.log(message);
    sessionStorage.clear();
    alert(message);
    //location.href = "index.html";
    // location.reload();
    registerPressed = false;
});

function register(firstName,lastName,email,DOB,gamerTag,password) {
    let data = {firstName:firstName, lastName:lastName, email:email, DOB:DOB, gamerTag:gamerTag, password:password};
    socket.emit("register", data);
}

function registerButtonPressed() {
    if (registerPressed) return; 
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let DOB = document.getElementById("DOB").value;
    let gamerTag = document.getElementById("gamerTag").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    
    if (firstName.length <= 0) { alert("Please Enter All Information!"); return;}
    if (lastName.length <= 0) { alert("Please Enter All Information!"); return;}
    if (email.length <= 0) { alert("Please Enter All Information!"); return;}
    if (DOB.length <= 0) { alert("Please Enter All Information!"); return;}
    if (gamerTag.length <= 0) { alert("Please Enter All Information!"); return;}
    if (password.length <= 0) { alert("Please Enter All Information!"); return;}
    if (confirmPassword.length <= 0) { alert("Please Enter All Information!"); return;}
    if (!email.includes("@")) { alert("Email is incorrect!"); return; };
    if (password != confirmPassword) { alert("Passwords Don't Match!"); return; };

    register(firstName,lastName,email,DOB,gamerTag,password);
    registerPressed = true;
    // location.href = "index.html";
    // register();
    // if(password == confirmPassword) {
    //     register(firstName,lastName,email,DOB,gamerTag,password);
    //     registerPressed = true;
    // } else {
    //     console.log("passwords dont match");
    // }
}