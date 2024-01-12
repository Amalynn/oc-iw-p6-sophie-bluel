
/**
 * This function close the modal window
 *  
 */
export function closeModal() {
    const modal = document.querySelector(".modal")
    modal.classList.toggle("hidden")
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")

    document.body.style.overflow = "auto";
}
