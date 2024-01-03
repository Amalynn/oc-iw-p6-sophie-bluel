/**
 * This function allows to create the elements of the edit mode
 * 
 */
export function createEditingSession () {

    // Edition banner    
    const buttonEditing = `
            <div class="editing-banner">
                <i class="fa-regular fa-pen-to-square"></i>Mode édition
            </div> ` ;

    let bodyElement = document.querySelector("body");
    bodyElement.insertAdjacentHTML("afterbegin", buttonEditing);       

    // logout link
    const loginLinkElement = document.querySelector("a[href*='login']");
    loginLinkElement.textContent = "Logout" ;
    loginLinkElement.id = "logout";
    loginLinkElement.href = "#";

    // Projects modification button
    const buttonModificationProjects = `
            <span class="btn-editing-projects">
                <i class="fa-regular fa-pen-to-square"></i>modifier
            </span> ` ;
    const h2Element = document.querySelector("#portfolio h2");    
    h2Element.insertAdjacentHTML("beforeend", buttonModificationProjects);
    h2Element.classList.add("editing-h2");   
}