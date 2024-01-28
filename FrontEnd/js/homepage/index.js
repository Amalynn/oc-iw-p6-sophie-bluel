// Import files
import { isConnected } from "../edition/isConnected.js";
import { getData } from "../api/getData.js";
import { displayWorks } from "../works/displayWorks.js";
import { displayCategories } from "../categories/displayCategories.js";
import { createEditingSession } from "../edition/createEditingSession.js";
import { logout } from "../auth/logout.js";
import * as modal from "../modal/modal.js";
import * as form from "../modal/form.js";
import { postData } from "../api/postData.js";
import { resetElements } from "../works/resetElements.js";
import { showSuccessErrorMessage } from "../works/showSuccessErrorMessage.js";
import { displayWorksModal } from "../works/displayWorksModal.js";

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

        resetElements("#modal-gallery .grid-works");
        displayWorksModal("#modal-gallery .grid-works");       
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
//Form - Add Projects

form.createCategoriesOptionsForm() ;
form.hiddenInputSelectImage();

// let validateForm = isFormCompleted() ;

// if(validateForm) {
//     form.activateSubmitButtonFom() ;
//     //form.addNewProject();
// } else {
//     console.log("Formulaire invalide. Veuillez vérifier votre saisie.")
// }


const inputFileElement = document.getElementById("js-input-file");


inputFileElement.addEventListener("change", (event) => {
    let file = event.target.files[0];
    const fileSizeMaxOctets = 4194304 ;

    if(file) {

        if(file.size > fileSizeMaxOctets) {
            const parentNode = document.getElementById("js-form");
            const nextSibling = document.querySelector(".input-project-image-container");
            let paragrapheElement = document.createElement("p");

            paragrapheElement.innerHTML = `La taille de l'image <strong>${file.name}</strong> dépasse la limite autorisée de 4Mo.</p>`;
            paragrapheElement.classList.add("message-info", "error");
            paragrapheElement.id = "js-error";
            parentNode.insertBefore(paragrapheElement, nextSibling);            

        } else {            
            const errorMessage = document.getElementById("js-error");
            if(errorMessage) {
                form.removeErrorMessage(errorMessage); 
            }            

            const reader = new FileReader() ;

            reader.addEventListener("load", (event) => {
                const previewProjectImage = document.createElement("img");
                previewProjectImage.src = event.target.result ;                    

                const previewImageContainer = document.querySelector(".input-project-image-container");
                const previewImageContainerChildren = previewImageContainer.children ;
                
                for(let i = 0; i < previewImageContainerChildren.length; i++) {
                    previewImageContainerChildren[i].classList.add("hidden");
                }
                previewImageContainer.appendChild(previewProjectImage);
                previewProjectImage.classList.add("previewProjectImage");
            })
            
            reader.readAsDataURL(file);             
        }
    }   
})

// const inputProjectTitle = document.getElementById("input-title");

// inputProjectTitle.addEventListener("input", () => {
//     let projectTitle = inputProjectTitle.value ;
//     console.log(projectTitle);

//     if(projectTitle.length >= 2) {
//         return true ;
//     } else {
//         return false ;
//     }    
// })


// inputTitle.addEventListener("change", () => {
//     if(inputTitle.value.length > 1) {
//         newProject.title = inputTitle.value ;
//     } else {
//         newProject.title = "";
//     }  
//     console.log(newProject) 
// })


// selectCategories.addEventListener("change", () => {
//     if(selectCategories.value !== "") {
//         newProject.category = parseInt(selectCategories.value);
//     } else {
//         newProject.category = "";
//     }
//     console.log(newProject);
// })

// Activate the validate new project button
const inputTitle = document.getElementById("input-title");
const selectCategories = document.getElementById("select-categories");

inputFileElement.addEventListener("change", form.activateBtnValidateNewProject);
inputTitle.addEventListener("input", form.activateBtnValidateNewProject);
selectCategories.addEventListener("change", form.activateBtnValidateNewProject);


const formSubmit = document.getElementById("js-form");

formSubmit.addEventListener("submit", async (event) => {
    event.preventDefault();
       
    const projectTitle = document.getElementById("input-title").value ;
    const projectCategory = parseInt((document.getElementById("select-categories").value));

    console.log(projectTitle);
    console.log(projectCategory);
    console.log(inputFileElement.files[0]);


    const formData = new FormData() ;
    formData.append("title", projectTitle);
    formData.append("category", projectCategory);
    formData.append("image", inputFileElement.files[0] );

    let responsePostNewProject = await postData("/works", formData) ;
    console.log(responsePostNewProject);

    if(responsePostNewProject === 201) {
        const works = await getData("/works");

        const message = `<p class="message-info succes">Le projet <strong>${projectTitle}</strong> a bien été ajouté.</p>`
        showSuccessErrorMessage(message, "#modal-add-projects .modal-body");
        
        resetElements("#portfolio .gallery");
        displayWorks(works, "#portfolio .gallery");

        form.resetAddProjectsForm();

        setTimeout(() => {
            const messageInfo = document.querySelector(".message-info");
            messageInfo.remove();
        }, 3000);

    } else {
        const message = '<p class="message-info error">Une erreur est survenue lors de l\'envoi des données. Veuillez rééssayer</p>' ;
        showSuccessErrorMessage(message, "#modal-add-projects .modal-body");

        setTimeout(() => {
            const messageInfo = document.querySelector(".message-info");
            messageInfo.remove();
        }, 3000);
    }

})



