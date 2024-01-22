/**
 * This function returns true if the user is logged in and false if the user is logged out. 
 */
export function isConnected() {

    const token = localStorage.token ;

    if (token) {
        return true;
    } else {
        return false
    }
}