// BOTONES Y ELEMENTOS HTML

let userSignup = document.getElementById("userSignup");
let userLogin = document.getElementById("userLogin");
let passSignup = document.getElementById("passSignup");
let passLogin = document.getElementById("passLogin");
let btnSignup = document.getElementById("btnSignup");
let btnLogin = document.getElementById("btnLogin");
let formSignup = document.getElementById("formSignup");
let formLogin = document.getElementById("formLogin");

// VARIABLES GLOBALES

let key = JSON.parse(localStorage.getItem("key")) || "";
let users = getUsers() || [];

// FUNCIONES

// AUXILIARES

function getUsers(){
    fetch(USER_URL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        users = data;
    })
    .catch(error => {
        console.log(error);
        alert("No se puede conectar al servidor");
    })
}

function getKey(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user": userSignup.value,
        "pass": passSignup.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(LOG_URL, requestOptions)
    .then(response => response.json())
    .then(data => {
        key = data;
    })
    .catch(error => {
        console.log(error)
        alert("No se puede conectar con el servidor")
    });
}

formSignup.addEventListener("submit", function(){

    for(let user of users){
        if(user.user === userSignup.value){
            alert("Usuario ya existente");
            event.preventDefault();
            return;
        }
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user": userSignup.value,
        "pass": passSignup.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(USER_URL, requestOptions)
    .then(response => {
        if(response.ok){
            alert("Usuario creado con éxito");
        } else {
            alert("No se pudo crear el usuario");
        }
    })
    .catch(error => {
        alert("No se puede conectar al servidor");
    });

    key = getKey();
    
    localStorage.setItem("key", JSON.stringify(key));
    localStorage.setItem("usuario", JSON.stringify(userSignup.value));
    event.preventDefault();
});