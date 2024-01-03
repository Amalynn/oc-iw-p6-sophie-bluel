/**
 * This function allows to the user to log out of his editing session.
 */
export function logout() {
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", () => {
        localStorage.removeItem("token");
        location.reload();
    });
}
