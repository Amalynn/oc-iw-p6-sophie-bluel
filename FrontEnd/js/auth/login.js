import { auth } from "../api/auth.js";

// Retrieve the form element 
let form = document.querySelector(".form");

// Add an event listener on form element 
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const userEmail = document.querySelector("#inputUserEmail").value; 
    const userPassword = document.querySelector("#inputUserPassword").value;

    const userCredentialsData = {
        email: userEmail,
        password: userPassword
    }

    await auth("users/login", userCredentialsData) ;    
});

