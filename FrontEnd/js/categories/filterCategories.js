import { displayWorks } from "../works/displayWorks.js";
import { resetElements } from "../works/resetElements.js";
import { getData } from "../api/getData.js";

/**
 * This function display the filtered projects according to the categories' id.
 * 
 */
export async function filterCategories() {
    const listButtonsCategories = document.querySelectorAll(".btn-categories");
    
    const works = await getData("/works");
        
    listButtonsCategories.forEach((button) => {        
        button.addEventListener("click", (event) => {           

            listButtonsCategories.forEach( (button) => button.classList.remove("btn-categories--active"));
            event.target.classList.add("btn-categories--active");            
            
            let categoryId = Number(event.target.dataset.categoryid) ;
                        
            if (categoryId === 0) {                
                resetElements("#portfolio .gallery");
                displayWorks(works,"#portfolio .gallery");

            } else {
                let worksFilterByCategory = works.filter((work) => {
                    return work.categoryId === categoryId ;
                });
                resetElements("#portfolio .gallery");
                displayWorks(worksFilterByCategory, "#portfolio .gallery" );
            }           
        })
    })
}