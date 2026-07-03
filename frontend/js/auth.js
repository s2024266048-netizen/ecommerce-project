// REGISTER

const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const response = await fetch(
"https://ecommerce-project-production-e015.up.railway.app/api/auth/register",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
email,
password
})
}
);

const data = await response.json();

alert(data.message);

if(data.success){
window.location.href="login.html";
}

});

}


// LOGIN

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const response = await fetch(
"https://ecommerce-project-production-e015.up.railway.app/api/auth/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
}
);

const data = await response.json();

if(data.token){

localStorage.setItem("token", data.token);

alert("Login Successfull");

window.location.href="index.html";

}else{

alert(data.message);

}

});

}