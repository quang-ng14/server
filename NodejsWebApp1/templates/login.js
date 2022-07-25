// Check da dang nhap hay chua

    var name = sessionStorage.getItem('name');
    if (name != "undefined" && name != "null") {
        //window.location.reload();
        document.location.href = '/index.html';
    }


//Login
var loginPopup = document.querySelector("#password-popup");
var usernameInput = document.querySelector("#username-txt");
var passwordInput = document.querySelector("#password-txt");
var loginMsgDisplayer = document.querySelector("#login-msg");
function myGreeting() {
    loginPopup.classList.add("hide");
}
var wrongMsg = "*wrong username or password";



async function login() {
    if (usernameInput.value.trim() === "" || passwordInput.value.trim() === "") return;
    //console.log(JSON.stringify({
    //    username: usernameInput.value,
    //    password: passwordInput.value
    //}));
    var response = await fetch("login1", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            username: usernameInput.value,
            password: passwordInput.value
        })
    });
    //console.log(response);
    response = await response.json();
    //console.log(response);
    if (response.isSuccess) {
        if (sessionStorage) {
            //document.querySelector('#login-button').addEventListener('click', function () {
            //    var name = document.querySelector("#username-txt").value;
            //    sessionStorage.setItem('name', name);
            //    console.log(name);
            //});

            var name = document.querySelector("#username-txt").value;
            sessionStorage.setItem('name', name);
            console.log(name);
        }
        loginPopup.classList.add("hide-animation-class");
        document.location.href = '/index.html';
        setTimeout(myGreeting, 1000);

        
    }
    else {
        loginMsgDisplayer.textContent = wrongMsg;
        
    }
}
document.querySelector("#login-button").addEventListener("click", function () {
    login();
});