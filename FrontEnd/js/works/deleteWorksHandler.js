import { deleteData } from "../api/deleteData.js";
import { getData } from "../api/getData.js";
import { displayWorks } from "./displayWorks.js";
import { resetElements } from "./resetElements.js";
import { showSuccessErrorMessage } from "./showSuccessErrorMessage.js";


/**
 * This function allows to remove a project
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
                const message = '<p class="message-info succes">Le projet a bien été supprimé.</p>'
                showSuccessErrorMessage(message, "#modal-gallery .modal-body");

                resetElements("#portfolio .gallery");                
                displayWorks(works, "#portfolio .gallery");

                setTimeout(() => {
                    const messageInfo = document.querySelector(".message-info");
                    messageInfo.remove();
                }, 3000);

            } else {
                const message = '<p class="message-info error">Une erreur s\'est produite lors de la suppression du projet. Veuillez rééssayer</p>';
                showSuccessErrorMessage(message, "#modal-gallery .modal-body" );

                setTimeout(() => {
                    const messageInfo = document.querySelector(".message-info");
                    messageInfo.remove();
                }, 3000);
            }
            
        })
    })

}