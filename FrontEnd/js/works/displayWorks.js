/**
 * This function display the architect's works
 * It takes two parameters : an array of works and the CSS selector for the parent node  
 * @param {Array} listProjects The list of worhs retrieves from the api call
 * @param {string} parentNodeCSS The CSS selector of the parent element to link the works
 */
export function displayWorks(listProjects, parentNodeCSS) {  
    
    let html = "";
    const parentNodeElement = document.querySelector(`${parentNodeCSS}`);

    for (let i= 0; i < listProjects.length; i++) {
        
        let figureElementHtml = `<figure data-workCategoryId="${listProjects[i].categoryId}">
				                    <img src=${listProjects[i].imageUrl} alt=${listProjects[i].title}>
				                    <figcaption>${listProjects[i].title}</figcaption>
			                    </figure> `

        html += figureElementHtml ;
    }

    parentNodeElement.innerHTML = html ;     
}