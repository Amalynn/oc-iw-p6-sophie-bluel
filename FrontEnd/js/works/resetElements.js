/**
 * 
 * 
 */
export function resetElements(parentNodeToReset) {
    const parentNode = document.querySelector(parentNodeToReset);
    
    parentNode.innerHTML = "";
}