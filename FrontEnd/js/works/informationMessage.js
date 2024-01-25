/**
 * This function displays a information message when there are no projects in a categorie.
 * 
 */
export function showInformationMessage() {
    const message = `<p class="message-info information">Pas de projets disponibles pour cette catégorie.</p>` ;

    const parentNode = document.querySelector("#portfolio .gallery");
    parentNode.insertAdjacentHTML("beforebegin", message);    
}

/**
 * This function delete information message.
 * 
 */
export function removeInformationMessage() {
    const message = document.querySelector(".message-info.information");    
    if(message) {
        message.remove(); 
    }
       
}