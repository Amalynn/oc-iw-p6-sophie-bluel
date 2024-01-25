/**
 * This function displays a success message when the project is removed.
 * 
 */
export function showSuccessMessage() {
    const successMessage = `<p class="message-info succes">Le projet a bien été supprimé.</p>` ;

    const parentNode = document.querySelector("#modal-gallery .modal-body");
    parentNode.insertAdjacentHTML("afterbegin", successMessage);    
}