// Import files
import { getData } from "../api/getData.js";
import { displayWorks } from "../works/displayWorks.js";
import { displayCategories } from "../works/displayCategories.js";
import { filterCategories } from "../works/filterCategories.js";
import { createEditingSession } from "../edition/createEditingSession.js";
import { logout } from "../auth/logout.js";



if(!localStorage.getItem("token")) {  
    
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
    filterCategories(filtersButtons) ;

} else {

    // Display all the works
    const works = await getData("works") ;   
    displayWorks(works, "#portfolio .gallery");
    
    // Editing session
    createEditingSession();
    logout();    
}







