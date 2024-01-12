/**
 * This function open the modal window
 * 
 */
export function openModal() {
    const modal = document.querySelector(".modal")
    modal.classList.toggle("hidden")
    modal.setAttribute("aria-hidden", "false")
    modal.setAttribute("aria-modal", "true")

    document.body.style.overflow = "hidden";   
    
}