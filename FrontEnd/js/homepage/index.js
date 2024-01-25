// Import files
import { isConnected } from "../edition/isConnected.js";
import { getData } from "../api/getData.js";
import { displayWorks } from "../works/displayWorks.js";
import { displayCategories } from "../categories/displayCategories.js";
import { createEditingSession } from "../edition/createEditingSession.js";
import { logout } from "../auth/logout.js";
import * as modal from "../modal/modal.js";

import { deleteData } from "../api/deleteData.js";
import * as form from "../modal/form.js";

/* ************************************************************ */
/* ************************************************************ */

let userIsConnected = isConnected() ;

if (!userIsConnected) {

    const works = await getData("/works") ; 
    displayWorks(works, "#portfolio .gallery");
    displayCategories("#portfolio .filtersgroup");   
    
} else {

    const works = await getData("/works") ; 
    displayWorks(works, "#portfolio .gallery");
    createEditingSession();
    logout();
}

/* *********************************************************** */
/* *********************************************************** */

// Opening and closing modals
const buttonEditingProjects = document.querySelector(".btn-editing-projects");
const buttonAddProject = document.querySelector(".js-add-project-button");
const buttonsCloseModal = document.querySelectorAll(".js-modal-close");
const buttonBackToGalleryModal = document.querySelector(".js-modal-previous-window");

const modalBackground = document.querySelector(".modal");
const modalGallery = document.getElementById("modal-gallery");
const modalAddProject = document.getElementById("modal-add-projects");    


if(buttonEditingProjects) {
    buttonEditingProjects.addEventListener("click", (event) => {
        event.preventDefault();        
        modal.openModal();
    })
}

if(buttonsCloseModal) {
    buttonsCloseModal.forEach((closeButton) => {
        closeButton.addEventListener("click", (event) => {
            event.preventDefault();
            form.resetAddProjectsForm();
            modal.closeModal() ;
            if(modalGallery.classList.contains("hidden")) {
                modalGallery.classList.remove("hidden");
                modalAddProject.classList.add("hidden");
            }
        });
    });
}

if(modalBackground) {    
    modalBackground.addEventListener("click", (event) => {
        if (event.target === modalBackground) {            
            form.resetAddProjectsForm();
            modal.closeModal() ;
            if(modalGallery.classList.contains("hidden")) {
                modalGallery.classList.remove("hidden");
                modalAddProject.classList.add("hidden");
            }
        }        
    });
}

if(buttonBackToGalleryModal) {
    buttonBackToGalleryModal.addEventListener("click", () => {
        modalAddProject.classList.toggle("hidden");
        modalGallery.classList.toggle("hidden");
        form.resetAddProjectsForm();        
    })
}

if(buttonAddProject) {
    buttonAddProject.addEventListener("click", () => {
        const modalGallery = document.getElementById("modal-gallery");
        const modalAddProject = document.getElementById("modal-add-projects");
        
        modalGallery.classList.toggle("hidden");
        modalAddProject.classList.toggle("hidden");
    })
}    

/* ************************************************************* */
/* ************************************************************* */
// Remove projects


 

//     window.onload = (event) => {
//         const btnDeleteProjectsList = document.querySelectorAll(".btn-delete");
//     console.log(btnDeleteProjectsList);
//       };
    

//     //const parentNode = document.querySelectorAll(".thumbnail-work");
//     //console.log(parentNode);

    
    
//     //btnDeleteProjectsList.forEach((btnDelete) => {
//         //btnDelete.addEventListener("click", (event) => {
                       
//             //let projectId = event.target.parentNode.dataset.workId;
//             //let parentNode 
//             //console.log(projectId);

//             let responseDeleteData = await deleteData(`/works/${projectId}`);
//             console.log(responseDeleteData);   
//         //})
//     //});



//     //Form - Add Projects

//     form.createCategoriesOptionsForm() ;

//         // Masquer l'élément <input>
//     const fileSelectButton = document.getElementById("js-file-select");
//     const inputFileElement = document.getElementById("js-input-file");

//     fileSelectButton.addEventListener("click", () => {
//         if(inputFileElement) {
//             inputFileElement.click() ;
//         }
//     });    

//     inputFileElement.addEventListener("change", (event) => {
//         let file = event.target.files[0];
//         const fileSizeMaxOctets = 4194304 ;

//         if(file) {

//             if(file.size > fileSizeMaxOctets) {
//                 const parentNode = document.getElementById("js-form");
//                 const nextSibling = document.querySelector(".input-project-image-container");
//                 let paragrapheElement = document.createElement("p");
    
//                 paragrapheElement.innerHTML = `La taille de l'image <strong>${file.name}</strong> dépasse la limite autorisée de 4Mo.</p>`;
//                 paragrapheElement.classList.add("error");
//                 paragrapheElement.id = "js-error";
//                 parentNode.insertBefore(paragrapheElement, nextSibling);
                
//             } else {            
//                 const errorMessage = document.getElementById("js-error");
//                 if(errorMessage) {
//                     form.removeErrorMessage(errorMessage); 
//                 }
                
//                 const reader = new FileReader() ;

//                 reader.addEventListener("load", (event) => {
//                     const previewProjectImage = document.createElement("img");
//                     previewProjectImage.src = event.target.result ;                    

//                     const previewImageContainer = document.querySelector(".input-project-image-container");
//                     const previewImageContainerChildren = previewImageContainer.children ;
                    
//                     for(let i = 0; i < previewImageContainerChildren.length; i++) {
//                         previewImageContainerChildren[i].classList.add("hidden");
//                     }
//                     previewImageContainer.appendChild(previewProjectImage);
//                     previewProjectImage.classList.add("previewProjectImage");
//                 })
                
//                 reader.readAsDataURL(file);                      
    
//             }

//         }

        
//     })
    
    
// }











