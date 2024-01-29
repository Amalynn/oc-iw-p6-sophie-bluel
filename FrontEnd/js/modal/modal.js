import { displayWorksModal } from "../works/displayWorksModal.js";
import { resetAddProjectsForm } from "./form.js";
import { resetElements } from "../works/resetElements.js";


/**
 * This function opens the modal window.
 * 
 */
function openModal(){ 
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
 * This function closes the modal window.
 *  
 */
export function closeModal() {   
    const modal = document.querySelector(".modal"); 
    modal.classList.toggle("hidden")
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")

    document.body.style.overflow = "auto";
}

/**
 * This function allows to open the gallery modal to remove a project
 */
export function openGalleryModal() {
    const buttonEditingProjects = document.querySelector(".btn-editing-projects");
      
    if(buttonEditingProjects) {
        buttonEditingProjects.addEventListener("click", (event) => {
            event.preventDefault();        
            openModal();
        })
    }
}


/**
 * This function allows to close modals with the cross icon
 */
export function closeModalsWithCrossIcon() {
    const buttonsCloseModal = document.querySelectorAll(".js-modal-close");
    const modalGallery = document.getElementById("modal-gallery");
    const modalAddProject = document.getElementById("modal-add-projects"); 

    if(buttonsCloseModal) {
        buttonsCloseModal.forEach((closeButton) => {
            closeButton.addEventListener("click", (event) => {
                event.preventDefault();
                resetAddProjectsForm();
                closeModal() ;
                if(modalGallery.classList.contains("hidden")) {
                    modalGallery.classList.remove("hidden");
                    modalAddProject.classList.add("hidden");
                }
            });
        });
    }
}


/**
 * This function allows to close modals by clicking on the webpage background. 
 */
export function closeModalsByClickingBackground() {
    const modalBackground = document.querySelector(".modal");
    const modalGallery = document.getElementById("modal-gallery");
    const modalAddProject = document.getElementById("modal-add-projects");   

    if(modalBackground) {    
        modalBackground.addEventListener("click", (event) => {
            if (event.target === modalBackground) {            
                resetAddProjectsForm();
                closeModal() ;
                if(modalGallery.classList.contains("hidden")) {
                    modalGallery.classList.remove("hidden");
                    modalAddProject.classList.add("hidden");
                }
            }        
        });
    }
}


/**
 * This function allows to go back to the gallery modal. 
 */
export function goBackToGalleryModal() {
    const buttonBackToGalleryModal = document.querySelector(".js-modal-previous-window");
    const modalGallery = document.getElementById("modal-gallery");
    const modalAddProject = document.getElementById("modal-add-projects");   

    if(buttonBackToGalleryModal) {
        buttonBackToGalleryModal.addEventListener("click", () => {
            modalAddProject.classList.toggle("hidden");
            modalGallery.classList.toggle("hidden");
            resetAddProjectsForm(); 
    
            resetElements("#modal-gallery .grid-works");
            displayWorksModal("#modal-gallery .grid-works");       
        })
    }
}


/**
 * This function allows to open the modal in order to add a new project
 */
export function openModalToAddNewProject() {
    const buttonAddProject = document.querySelector(".js-add-project-button");

    if(buttonAddProject) {
        buttonAddProject.addEventListener("click", () => {
            const modalGallery = document.getElementById("modal-gallery");
            const modalAddProject = document.getElementById("modal-add-projects");
            
            modalGallery.classList.toggle("hidden");
            modalAddProject.classList.toggle("hidden");
        })
    }    
}