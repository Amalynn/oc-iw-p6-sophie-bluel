import { getData } from "../api/getData.js";

/**
 * This function display the architect's works in thumbnails format
 * It takes two parameters : an array of works and the CSS selector for the parent node   
 * @param {string} parentNodeCSS The CSS selector of the parent element to link the works
 */
export async function displayWorksModal(parentNodeCSS) {  
    const works = await getData("/works") ; 
  
    let html = "";
    const parentNodeElement = document.querySelector(`${parentNodeCSS}`);

    for (let i= 0; i < works.length; i++) {
        
        let thumbnailElementHtml = `<div class="thumbnail-work" data-work-id="${works[i].id}">
                                        <button type="button" class="btn-delete js-remove-work" data-work-id="${works[i].id}">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                        <img src="${works[i].imageUrl}" alt="${works[i].title}">
                                    </div>`

        html += thumbnailElementHtml ;
    }

    parentNodeElement.innerHTML = html ;  
    
    const parentNode = document.querySelectorAll(".js-remove-work");
    console.log(parentNode);
    
}