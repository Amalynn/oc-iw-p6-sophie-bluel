/**
 * This function display the architect's works in thumbnails format
 * It takes two parameters : an array of works and the CSS selector for the parent node   
 * @param {Array} listWorks An array of objects to display
 * @param {string} parentNodeCSS The CSS selector of the parent element to link the works
 */
export function displayWorksModal(listWorks, parentNodeCSS) {    
    let html = "";
    const parentNodeElement = document.querySelector(`${parentNodeCSS}`);

    for (let i= 0; i < listWorks.length; i++) {
        
        let thumbnailElementHtml = `<div class="thumbnail-work" data-work-id="${listWorks[i].id}">
                                        <button type="button" class="btn-delete js-remove-work" data-work-id="${listWorks[i].id}">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                        <img src="${listWorks[i].imageUrl}" alt="${listWorks[i].title}">
                                    </div>`

        html += thumbnailElementHtml ;
    }

    parentNodeElement.innerHTML = html ;    
}