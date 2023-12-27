import { getData } from "../api/getData.js";

/**
 * 
 * 
 * 
 */
export async function displayWorks() {
    const works = await getData("works") ;
    
    let galleryHtml = "";

    for (let i= 0; i < works.length; i++) {
        
        let figureElementHtml = `<figure>
				                    <img src=${works[i].imageUrl} alt=${works[i].title}>
				                    <figcaption>${works[i].title}</figcaption>
			                    </figure> `

        galleryHtml += figureElementHtml ;
    }

    const galleryDivHtml = document.querySelector("#portfolio .gallery");
    galleryDivHtml.innerHTML = galleryHtml ;    

}