// Import files
import { isConnected } from "../edition/isConnected.js";
import { getData } from "../api/getData.js";
import { displayWorks } from "../works/displayWorks.js";
import { displayCategories } from "../categories/displayCategories.js";
import { createEditingSession } from "../edition/createEditingSession.js";
import { logout } from "../auth/logout.js";
import {openModal} from "../modal/openModal.js";
import { closeModal } from "../modal/closeModal.js";
import { displayWorksModal } from "../modal/displayWorksModal.js";
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

//const buttonEditingProjects = document.querySelector(".btn-editing-projects");
//console.log(buttonEditingProjects);




// } else {

//     

//     // Opening and closing modals
//     const backToGalleryModal = document.querySelector(".js-modal-previous-window");
//     const modalGallery = document.getElementById("modal-gallery");
//     const modalAddProject = document.getElementById("modal-add-projects");    
//     const modalCloseButtons = document.querySelectorAll(".js-modal-close");
//     const buttonEditingProjects = document.querySelector(".btn-editing-projects");
    
//     buttonEditingProjects.addEventListener("click", openModal) ;       
    
//     modalCloseButtons.forEach((closeButton) => {
//         closeButton.addEventListener("click", () => {
//             form.resetAddProjectsForm();
//             closeModal() ;
//             if(modalGallery.classList.contains("hidden")) {
//                 modalGallery.classList.remove("hidden");
//                 modalAddProject.classList.add("hidden");
//             }
//         });
//     });    

//     const modal = document.querySelector(".modal") ;
//     modal.addEventListener("click", (event) => {
//         if (event.target === modal) {            
//             form.resetAddProjectsForm();
//             closeModal() ;
//             if(modalGallery.classList.contains("hidden")) {
//                 modalGallery.classList.remove("hidden");
//                 modalAddProject.classList.add("hidden");
//             }
//         }        
//     });

//     backToGalleryModal.addEventListener("click", () => {
//         modalAddProject.classList.toggle("hidden");
//         modalGallery.classList.toggle("hidden");
//         form.resetAddProjectsForm();
        
//     })

//     // Display thumbnails of works into the modal
//     displayWorksModal(".grid-works");
    
//     // Remove projects  

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

//     // Toggle between modal windows
//     const buttonAddProject = document.querySelector(".js-add-project-button");
    
//     buttonAddProject.addEventListener("click", () => {
//         const modalGallery = document.getElementById("modal-gallery");
//         const modalAddProject = document.getElementById("modal-add-projects");
        
//         modalGallery.classList.toggle("hidden");
//         modalAddProject.classList.toggle("hidden");
//     })

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











