import { getData } from "../api/getData.js";

/**
 * This function allows to reset form data . * 
 */
export function resetAddProjectsForm() {
    const form = document.getElementById("js-form");    
    form.reset() ;
    

    const errorMessage = document.getElementById("js-error");
    if(errorMessage) {
        removeErrorMessage(errorMessage);
    }    
    
    resetPreviewProjectImageContainer();
}


/**
 * This function allows to remove an error message into the form. 
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
    const parentNode = document.getElementById("select-categories");

    let categoriesOptionsSelect = `<option value=""> </option>` ;

    if (categories) {
        for(let i = 0; i < categories.length; i++) {
            categoriesOptionsSelect += `<option value="${categories[i].id}">${categories[i].name}</option>`
        }
    }

    parentNode.innerHTML = categoriesOptionsSelect ;
}


/**
 * 
 */
export function activateSubmitButtonFom () {
    const submitButtonForm = document.getElementById("btnValidateNewProject");

    if(submitButtonForm.hasAttribute("disabled")) {
        submitButtonForm.removeAttribute("disabled") ;
    }
}

/**
 * 
 * 
 */
export function desactivateSubmitButtonFom () {
    const submitButtonForm = document.getElementById("btnValidateNewProject");

    if(!submitButtonForm.hasAttribute("disabled")) {
        submitButtonForm.setAttribute("disabled") ;
    }
}

/**
 * 
 * 
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
 * 
 * 
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
 * 
 * 
 */
function checkImageSize() {
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

                return false ;
                
            } else {            
                const errorMessage = document.getElementById("js-error");
                if(errorMessage) {
                    removeErrorMessage(errorMessage); 
                }
                
                showProjectImagePreview(file);
                return true ;
            }
        }   
    })
}


/**
 * 
 * 
 */
function checkProjectTitle() {
    const inputProjectTitle = document.getElementById("input-title");

    inputProjectTitle.addEventListener("input", () => {
        let projectTitle = inputProjectTitle.value ;
        console.log(projectTitle);
    
        if(projectTitle.length >= 2) {
            return true ;
        } else {
            return false ;
        }    
    }) 
}



/**
 * 
 * 
 */
export function isFormCompleted() {

}