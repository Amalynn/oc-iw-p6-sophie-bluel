import { getData } from "../api/getData.js";
import { deleteWorksHandler } from "./deleteWorksHandler.js";

/**
 * This function display the architect's works in thumbnails format
 * It takes one parameter : the CSS selector for the parent node   
 * @param {string} parentNodeCSS The CSS selector of the parent element to link the works
 */
export async function displayWorksModal(parentNodeCSS) {  
    const works = await getData("/works") ; 
  
    let html = "";
    const parentNodeElement = document.querySelector(`${parentNodeCSS}`);

    for (let i= 0; i < works.length; i++) {
        
        let thumbnailElementHtml = `<div class="thumbnail-work">
                                        <button type="button" class="btn-delete" data-work-id="${works[i].id}">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                        <img src="${works[i].imageUrl}" alt="${works[i].title}">
                                    </div>`

        html += thumbnailElementHtml ;
    }

    parentNodeElement.innerHTML = html ;  
    
    //script pour supprimer un élément
    //const parentNode = document.querySelectorAll(".js-remove-work");
    //console.log(parentNode);
    deleteWorksHandler();
    
}