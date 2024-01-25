import { deleteData } from "../api/deleteData.js";
import { getData } from "../api/getData.js";
import { displayWorks } from "./displayWorks.js";
import { resetElements } from "./resetElements.js";
import { showSuccessMessage } from "./showSuccessMessage.js";


/**
 * 
 * 
 */
export function deleteWorksHandler() {
    const btnDeleteWorksList = document.querySelectorAll("#modal-gallery .btn-delete");
    
    btnDeleteWorksList.forEach( (btnDelete) => {
        btnDelete.addEventListener("click", async () => {
            const workId = btnDelete.dataset.workId ;
            const parentNode = btnDelete.parentElement ;            
            
            let responseDeleteProject = await deleteData(`/works/${workId}`);
            
            if (responseDeleteProject === 204) {
                const works = await getData("/works");

                parentNode.remove();
                showSuccessMessage();

                resetElements("#portfolio .gallery");                
                displayWorks(works, "#portfolio .gallery");

                setTimeout(() => {
                    const messageInfo = document.querySelector(".message-info");
                    messageInfo.remove();
                }, 3000);

            } else {
                showErrorMessage();

                setTimeout(() => {
                    const messageInfo = document.querySelector(".message-info");
                    messageInfo.remove();
                }, 3000);
            }
            
        })
    })

}