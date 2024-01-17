// Import files
import { getData } from "../api/getData.js";
import { displayWorks } from "../works/displayWorks.js";
import { displayCategories } from "../works/displayCategories.js";
import { filterCategories } from "../works/filterCategories.js";
import { createEditingSession } from "../edition/createEditingSession.js";
import { logout } from "../auth/logout.js";
import {openModal} from "../modal/openModal.js";
import { closeModal } from "../modal/closeModal.js";
import { displayWorksModal } from "../modal/displayWorksModal.js";
import { deleteData } from "../api/deleteData.js";
import * as form from "../modal/form.js";




if(!localStorage.getItem("token")) {  
    
    // Display all works
    const works = await getData("works") ;    
    displayWorks(works, "#portfolio .gallery");

    // Display the categories of the projects
    const categoriesProjects = await getData("categories");
    categoriesProjects.unshift({id:0, name:"Tous"});
    displayCategories(categoriesProjects, "#portfolio .filtersgroup");

    // First filter active 
    const filtersButtons = document.querySelectorAll(".filtersgroup button");
    filtersButtons[0].classList.add("btn-categories--active");


    // Filter works according to categories
    filterCategories(filtersButtons) ;

} else {

    // Display all the works
    const works = await getData("works") ;   
    displayWorks(works, "#portfolio .gallery");
    
    // Editing session
    createEditingSession();
    logout();

    // Opening and closing modals
    const backToGalleryModal = document.querySelector(".js-modal-previous-window");
    const modalGallery = document.getElementById("modal-gallery");
    const modalAddProject = document.getElementById("modal-add-projects");    
    const modalCloseButtons = document.querySelectorAll(".js-modal-close");
    const buttonEditingProjects = document.querySelector(".btn-editing-projects");
    
    buttonEditingProjects.addEventListener("click", openModal) ;       
    
    modalCloseButtons.forEach((closeButton) => {
        closeButton.addEventListener("click", () => {
            form.resetAddProjectsForm();
            closeModal() ;
            if(modalGallery.classList.contains("hidden")) {
                modalGallery.classList.remove("hidden");
                modalAddProject.classList.add("hidden");
            }
        });
    });    

    const modal = document.querySelector(".modal") ;
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {            
            form.resetAddProjectsForm();
            closeModal() ;
            if(modalGallery.classList.contains("hidden")) {
                modalGallery.classList.remove("hidden");
                modalAddProject.classList.add("hidden");
            }
        }        
    });

    backToGalleryModal.addEventListener("click", () => {
        modalAddProject.classList.toggle("hidden");
        modalGallery.classList.toggle("hidden");
        form.resetAddProjectsForm();
        
    })

    // Display thumbnails of works into the modal
    displayWorksModal(works, ".grid-works");
    
    // Remove projects
    document.querySelectorAll(".js-remove-work").forEach((btnDelete) => {
        btnDelete.addEventListener("click", (event) => {
            event.preventDefault() ;
            let projectId = Number(event.target.parentNode.dataset.workId);
            deleteData(`works/${projectId}`);   
        })
    });

    // Toggle between modal windows
    const buttonAddProject = document.querySelector(".js-add-project-button");
    
    buttonAddProject.addEventListener("click", () => {
        const modalGallery = document.getElementById("modal-gallery");
        const modalAddProject = document.getElementById("modal-add-projects");
        
        modalGallery.classList.toggle("hidden");
        modalAddProject.classList.toggle("hidden");
    })

    //Form - Add Projects
    
        // Masquer l'élément <input>
    const fileSelectButton = document.getElementById("js-file-select");
    const inputFileElement = document.getElementById("js-input-file");

    fileSelectButton.addEventListener("click", () => {
        if(inputFileElement) {
            inputFileElement.click() ;
        }
    });

    form.createCategoriesOptionsForm() ;
    
}











