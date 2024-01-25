/**
 * This function allows to connect a user to his edition session. 
 * If the auth is OK, the user is redirect on his edition session. 
 * Otherwise, an error message is displayed on the login page.
 * @param {string} endpoint The URI of the ressource
 * @param {Object} credentialsData Object with the user's credentials : email and password
 */
export async function auth(endpoint, credentialsData) {
    try {
        const response = await fetch(`http://localhost:5678/api/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentialsData)
        }) ;
        
        if (response.ok) {
            const data = await response.json();
            const userToken = data.token;            
            localStorage.setItem("token", userToken) ;
            window.location.href = "index.html"; 
        } else {
            throw new Error("Erreur dans l'identifiant ou le mot de passe");
        }       
        
    } catch (error) {
        let parentNode = document.querySelector("#login");
        let nextSibling = document.querySelector(".form"); 

        let paragrapheElement = document.createElement("p");
        paragrapheElement.textContent = error.message ;
        paragrapheElement.classList.add("message-info", "error");
        parentNode.insertBefore(paragrapheElement, nextSibling);        
    }
}