// BOTONES Y ELEMENTOS HTML

let userSignup = document.getElementById("userSignup");
let userLogin = document.getElementById("userLogin");
let passSignup = document.getElementById("passSignup");
let passLogin = document.getElementById("passLogin");
let btnSignup = document.getElementById("btnSignup");
let btnLogin = document.getElementById("btnLogin");
let formSignup = document.getElementById("formSignup");
let formLogin = document.getElementById("formLogin");

// FUNCIONES

// CREAR UN USUARIO

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    mode: 'no-cors'
  };

fetch(USER_URL, requestOptions)
.then(response => {
    console.log(response)
    return response.json();
})
.then(data => {
    console.log(data)
})
.catch(error => {
    console.log(error)
})

formSignup.addEventListener("submit", function(){

    let myHeaders = new Headers();
    // myHeaders.append("access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzAwNTI3ODc4fQ.-2v-itizmjhMJpDICq8t8WZvTHxeHMLL9N6qsZ8Tf_A");
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "user": userSignup.value,
        "pass": passSignup.value
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'no-cors'
    };

    let requestOptionsGET = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'no-cors'
    };

    console.log(requestOptions);

    let key;

    fetch(LOG_URL, requestOptions)
    .then(response => response.json())
    .then(data => {
        key = data;
        myHeaders.append("access-token", JSON.stringify(key));
        requestOptions.headers = myHeaders;
        requestOptionsGET.headers = myHeaders;
    })
    .catch(error => {
        alert("No se puede conectar al servidor");

    });

    let usersArray = [];

    fetch(USER_URL, requestOptionsGET)
    .then(response => response.json())
    .then(data => {
        usersArray = data;
    })
    .catch(error => {
        alert("No se puede conectar al servidor");
    });

    for(let user of usersArray){
        if(user.user === userSignup.value){
            alert("Usuario ya existente");
            event.preventDefault();
            return;
        }
    }

    fetch(USER_URL, requestOptions)
    .then(response => {
        alert("Usuario creado con éxito");
    })
    .catch(error => {
        alert("No se puede conectar al servidor");
    });

    localStorage.setItem("usuario", userSignup.value);
    event.preventDefault();
});