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
}

/**
 * This function allows to remove an error message into the form. 
 */
export function removeErrorMessage(errorMessageElement) {
    errorMessageElement.remove() ;
}


/**
 * This function allows to create dynamically the projects' categories for the <select> HTML tag. 
 */
export async function createCategoriesOptionsForm() {
    const categories = await getData("categories");
    const parentNode = document.getElementById("select-categories");

    let categoriesOptionsSelect = `<option value=""> </option>` ;

    if (categories) {
        for(let i = 0; i < categories.length; i++) {
            categoriesOptionsSelect += `<option value="${categories[i].id}">${categories[i].name}</option>`
        }
    }

    parentNode.innerHTML = categoriesOptionsSelect ;
}