/**
 * This function display the architect's works
 * It takes two parameters : an array of works and the CSS selector for the parent node   
 * @param {Array} listWorks An array of objects to display
 * @param {string} parentNodeCSS The CSS selector of the parent element to link the works
 */
export function displayWorks(listWorks, parentNodeCSS) {    
    let html = "";
    const parentNodeElement = document.querySelector(`${parentNodeCSS}`);

    for (let i= 0; i < listWorks.length; i++) {
        
        let figureElementHtml = `<figure data-workCategoryId="${listWorks[i].categoryId}">
				                    <img src=${listWorks[i].imageUrl} alt=${listWorks[i].title}>
				                    <figcaption>${listWorks[i].title}</figcaption>
			                    </figure> `

        html += figureElementHtml ;
    }

    parentNodeElement.innerHTML = html ;    
}