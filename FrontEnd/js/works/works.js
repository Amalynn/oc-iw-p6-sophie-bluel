// Import files
import { getData } from "../api/getData.js";
import { displayWorks } from "./displayWorks.js";
import { displayCategories } from "./displayCategories.js";


// Display all works
const works = await getData("works") ;
displayWorks(works, "#portfolio .gallery");

// Display the categories of the projects
 const categoriesProjects = await getData("categories");
 categoriesProjects.unshift({id:0, name:"Tous"});
 displayCategories(categoriesProjects, "#portfolio .filtersgroup");

// First filter active 
const filtersButtons = document.querySelectorAll(".filtersgroup button");
filtersButtons[0].classList.add("btn-categories--active");


// Filter works according to categories
function filterCategories(listButtonsCategories) {
    
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

filterCategories(filtersButtons) ;

// filtersButtons[1].addEventListener("click", (event) => {
//     event.preventDefault() ;
//     console.log(event);
    
//     let categoryId = Number(event.target.getAttribute("data-categoryid"));
//     console.log(typeof(Number(categoryId)));

//     let worksFilterByCategory = works.filter((work) => {
//         return work.categoryId === categoryId ;
//     })
//     console.log(worksFilterByCategory); 
//     document.querySelector("#portfolio .gallery").innerHTML = "" ;

//     displayWorks(worksFilterByCategory, "#portfolio .gallery" );

// }) ;

function removeActiveClass() {
    const activeElements = document.getElementsByClassName("btn-categories--active");
    console.log(activeElements)
        //element.classList.remove("btn-categories--active")
    
}



