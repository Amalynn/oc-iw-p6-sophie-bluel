import { getData } from "../api/getData.js";
import { postData } from "../api/postData.js";
import { displayWorks } from "../works/displayWorks.js";
import { showSuccessErrorMessage } from "../works/showSuccessErrorMessage.js";
import { resetElements } from "../works/resetElements.js";

/**
 * This function allows to reset form data . 
 */
export function resetAddProjectsForm() {
    const form = document.getElementById("js-form");    
    const btnValidateNewProject = document.getElementById("btnValidateNewProject");
    
    form.reset() ;
    btnValidateNewProject.disabled = true ;    

    const errorMessage = document.getElementById("js-error");
    if(errorMessage) {
        removeErrorMessage(errorMessage);
    }    
    
    resetPreviewProjectImageContainer();
}


/**
 * This function allows to remove an error message into the form. 
 * @param {object} errorMessageElement The element HTML to remove
 */
export function removeErrorMessage(errorMessageElement) {
    errorMessageElement.remove() ;
}


/**
 * This function resets the settings to add an image.
 * 
 */
function resetPreviewProjectImageContainer() {
    const previewProjectImage = document.querySelector(".previewProjectImage");
    if(previewProjectImage) {
        previewProjectImage.remove();
    }
    
    const previewProjectImageContainer = document.querySelector(".input-project-image-container");
    const previewProjectImageContainerChildren = previewProjectImageContainer.children ;
                    
    for(let i = 0; i < previewProjectImageContainerChildren.length; i++) {
        previewProjectImageContainerChildren[i].classList.remove("hidden");
    }
}


/**
 * This function allows to create dynamically the projects' categories for the <select> HTML tag. 
 */
export async function createCategoriesOptionsForm() {
    const categories = await getData("/categories");
    const parentNode = document.querySelector(".js-categories-element-parent");

    const labelSelectElement = document.createElement("label");
    labelSelectElement.setAttribute("for", "select-categories");
    labelSelectElement.textContent = "Categories";
    parentNode.appendChild(labelSelectElement);
    
    const selectWrapperElement = document.createElement("div");
    selectWrapperElement.className = "select-wrapper";
    parentNode.appendChild(selectWrapperElement);

    const selectElement = document.createElement("select");
    selectElement.id = "select-categories" ;
    selectElement.name = "selectCategories";
    selectElement.setAttribute("required", "");
    selectWrapperElement.appendChild(selectElement);

    let categoriesOptionsSelect = `<option value="0">&nbsp;</option>` ;

    if (categories) {
        for(let i = 0; i < categories.length; i++) {
            categoriesOptionsSelect += `<option value="${categories[i].id}">${categories[i].name}</option>`
        }
    }

    selectElement.innerHTML = categoriesOptionsSelect ;
}


/**
 * Activate the validate new project button 
 */ 
export function activateBtnValidateNewProject() {
    const projectImage = document.querySelector(".previewProjectImage"); 
    const inputProjectTitle = document.getElementById("input-title");
    const selectCategories = document.getElementById("select-categories");
    const btnValidateNewProject = document.getElementById("btnValidateNewProject");

    if(projectImage && inputProjectTitle.value.length >= 1 && selectCategories.value !== "0") {       
        btnValidateNewProject.disabled = false;
    } else {
        btnValidateNewProject.disabled = true;
    }
}


/**
 * This function allows to hidden the <input> HTML tag to select a file. 
 */
export function hiddenInputSelectImage() {
    const fileSelectButton = document.getElementById("js-file-select");
    const inputFileElement = document.getElementById("js-input-file");
    
    fileSelectButton.addEventListener("click", () => {
        if(inputFileElement) {
            inputFileElement.click() ;
        }
    });     
}


/**
 * This function displays a preview of the project image to add.
 * @param {object} file The image file to display 
 */
function showProjectImagePreview(file) {
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


/**
 * This function allows to verify if the image file size to add is less than 4Mo.
 * Otherwise, displays an error message.
 * 
 */
export function checkImageSize() {
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
                    removeErrorMessage(errorMessage); 
                }
                
                showProjectImagePreview(file);                
            }
        }   
    })
}


/**
 * This function allows to add a new project to the archietct's gallery. 
 */
export function addNewProject() {
    const formSubmit = document.getElementById("js-form");    

    formSubmit.addEventListener("submit", async (event) => {
        event.preventDefault();
           
        const projectTitle = document.getElementById("input-title").value ;
        const inputFileElement = document.getElementById("js-input-file");
        const projectCategory = parseInt((document.getElementById("select-categories").value));        

        if(projectTitle.trim().length > 2) {

            const formData = new FormData() ;
            formData.append("title", projectTitle);
            formData.append("category", projectCategory);
            formData.append("image", inputFileElement.files[0] );
        
            let responsePostNewProject = await postData("/works", formData) ;
                
            if(responsePostNewProject === 201) {
                const works = await getData("/works");
        
                const message = `<p class="message-info succes">Le projet <strong>${projectTitle}</strong> a bien été ajouté.</p>`
                showSuccessErrorMessage(message, "#modal-add-projects .modal-body");
                
                resetElements("#portfolio .gallery");
                displayWorks(works, "#portfolio .gallery");
        
                resetAddProjectsForm();
        
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

        } else {
            const message = '<p class="message-info error">Formulaire incomplet. Le titre du projet doit comporter plus de 2 caractères</p>' ;
            showSuccessErrorMessage(message, "#modal-add-projects .modal-body");  

            setTimeout(() => {
                const messageInfo = document.querySelector(".message-info");
                messageInfo.remove();
            }, 4000);
        }            
    })
}


