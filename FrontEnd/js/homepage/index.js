// Import files
import { isConnected } from "../edition/isConnected.js";
import { getData } from "../api/getData.js";
import { displayWorks } from "../works/displayWorks.js";
import { displayCategories } from "../categories/displayCategories.js";
import { createEditingSession } from "../edition/createEditingSession.js";
import { logout } from "../auth/logout.js";
import * as modal from "../modal/modal.js";
import * as form from "../modal/form.js";


/* ************************************************************ */
/* ************************************************************ */

let userIsConnected = isConnected() ;

if (!userIsConnected) {

    const works = await getData("/works") ; 
    displayWorks(works, "#portfolio .gallery");
    displayCategories("#portfolio .filtersgroup");   
    
} else {

    const works = await getData("/works") ; 
    displayWorks(works, "#portfolio .gallery");
    createEditingSession();
    logout();
}

/* *********************************************************** */
/* *********************************************************** */

// Opening and closing modals
modal.openGalleryModal();
modal.closeModalsWithCrossIcon();
modal.closeModalsByClickingBackground();
modal.goBackToGalleryModal();
modal.openModalToAddNewProject();



/* ************************************************************* */
/* ************************************************************* */
//Form - Add Projects

form.createCategoriesOptionsForm() ;
form.hiddenInputSelectImage();

form.checkImageSize();

// Activate the validate new project button
const inputFileElement = document.getElementById("js-input-file");
const inputTitle = document.getElementById("input-title");
const selectCategories = document.getElementById("select-categories");

inputFileElement.addEventListener("change", form.activateBtnValidateNewProject);
inputTitle.addEventListener("input", form.activateBtnValidateNewProject);

if (selectCategories) {
   selectCategories.addEventListener("change", form.activateBtnValidateNewProject);
}


// Submit Fom
form.addNewProject();
