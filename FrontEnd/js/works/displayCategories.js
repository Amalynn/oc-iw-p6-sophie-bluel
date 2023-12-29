/**
 * This function display the categories of the architect's works
 * It takes two parameters : an array of categories and the CSS selector for the parent node  
 * @param {Array} listCategories An array of objects to display
 * @param {string} parentNodeCSS  The CSS selector of the parent element to link the buttons
 */
export function displayCategories(listCategories, parentNodeCSS) {
    let html = "";
    const parentNodeElement = document.querySelector(`${parentNodeCSS}`);
 
 for(let i = 0; i < listCategories.length; i++) {
    let buttonCategoriesHtmlElement = `<button class="btn-categories" data-categoryId="${listCategories[i].id}">${listCategories[i].name}</button>`;
    html += buttonCategoriesHtmlElement;
 }

 parentNodeElement.innerHTML = html;

}

