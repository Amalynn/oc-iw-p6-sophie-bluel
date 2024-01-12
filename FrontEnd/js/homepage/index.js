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

    // Opening and closing modal
    document.querySelector(".btn-editing-projects").addEventListener("click", openModal) ;       
    document.querySelector(".js-modal-close").addEventListener("click", closeModal);

    const modal = document.querySelector(".modal") ;
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal()            
        }        
    });

    // Display thumbnails of works into the modal
    displayWorksModal(works, ".grid-works");
    
    // Remove projects
    document.querySelectorAll(".js-remove-work").forEach((thumbnail) => {
        thumbnail.addEventListener("click", (event) => {
            console.log(event);
        })
    });
    
}











