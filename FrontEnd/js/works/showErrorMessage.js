/**
 * This function displays an error message when an error occurs when project is removed.
 * 
 */
export function showErrorMessage() {
    const errorMessage = `<p class="message-info error">Une erreur s'est produite lors de la suppression du projet. Veuillez rééssayer</p>` ;

    const parentNode = document.querySelector("#modal-gallery .modal-body");
    parentNode.insertAdjacentHTML("afterbegin", errorMessage);    
}