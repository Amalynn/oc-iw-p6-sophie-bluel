/**
 * This function displays a success message. 
 * @param {string} message The text to display
 * @param {string} parentNodeCSS The CSS selector of the parent element in which the text will be display, before its first child.
 * 
 */
export function showSuccessErrorMessage(message, parentNodeCSS) {    
    const parentNode = document.querySelector(parentNodeCSS);
    parentNode.insertAdjacentHTML("afterbegin", message);    
}