/**
 * 
 * 
 * 
 */
export function filterCategories(listButtonsCategories) {
        
    listButtonsCategories.forEach((button) => {        
        button.addEventListener("click", (event) => {
            event.preventDefault() ;

            console.log(event);
            console.log(button);
            //removeActiveClass();
            event.target.classList.add("btn-categories--active");
            
            //let categoryId = Number(event.target.getAttribute("data-categoryid")) ;
            let categoryId = Number(event.target.dataset.categoryid) ;

            
            if (categoryId === 0) {
                document.querySelector("#portfolio .gallery").innerHTML = "" ;
                displayWorks(works, "#portfolio .gallery");

            } else {
                let worksFilterByCategory = works.filter((work) => {
                    return work.categoryId === categoryId ;
                });
                document.querySelector("#portfolio .gallery").innerHTML = "" ;
                displayWorks(worksFilterByCategory, "#portfolio .gallery" );
            }           
        })
    })
}