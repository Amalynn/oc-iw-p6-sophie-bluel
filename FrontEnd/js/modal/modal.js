import { displayWorksModal } from "../works/displayWorksModal.js";



/**
 * This function opens the modal window
 * 
 */
export function openModal(){ 
    const modal = document.querySelector(".modal");     
    const gridWorksModal = document.querySelector("#modal-gallery .grid-works");
    
    modal.classList.toggle("hidden");
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");

    document.body.style.overflow = "hidden";   
    
    if(gridWorksModal) {
        displayWorksModal("#modal-gallery .grid-works");
    }    
}


/**
 * This function closes the modal window
 *  
 */
export function closeModal() {   
    const modal = document.querySelector(".modal"); 
    modal.classList.toggle("hidden")
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")

    document.body.style.overflow = "auto";
}
