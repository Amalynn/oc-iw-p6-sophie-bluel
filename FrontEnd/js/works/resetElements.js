/**
 * This function allows to reset an specific element using its parent element.
 * @param {string} parentNodeToReset The CSS selecteur of the parent element to reset
 */
export function resetElements(parentNodeToReset) {
    const parentNode = document.querySelector(parentNodeToReset);
    
    parentNode.innerHTML = "";
}