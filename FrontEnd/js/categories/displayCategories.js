import { getData } from "../api/getData.js";
import { filterCategories } from "./filterCategories.js";

/**
 * This function display the categories of the architect's works
 * It takes one parameter : the CSS selector for the parent node  
 * @param {string} parentNodeCSS  The CSS selector of the parent element to link the buttons
 */
export async function displayCategories(parentNodeCSS) {
   const categories = await getData("/categories") ; 
   
   let html = '<button class="btn-categories btn-categories--active" data-categoryId=0>Tous</button>';
   const parentNodeElement = document.querySelector(`${parentNodeCSS}`);
 
   for(let i = 0; i < categories.length; i++) {
      let buttonCategoriesHtmlElement = `<button class="btn-categories" data-categoryId="${categories[i].id}">${categories[i].name}</button>`;
      html += buttonCategoriesHtmlElement;
   }

   parentNodeElement.innerHTML = html;

   filterCategories();
 
}


