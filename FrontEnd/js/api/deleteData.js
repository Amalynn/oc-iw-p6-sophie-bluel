/**
 * This function returns the data in json format from the api with the GET method
 * @param {String} endpoint The URI of the ressource 
 * @returns {Array} The data in json format from the API call
 */
export async function deleteData(endpoint) {

    let userToken = localStorage.token;
    try {
       const response = await fetch(`http://localhost:5678/api/${endpoint}`, {
            method: "DELETE",    
            headers: {
                "Authorization": `Bearer ${userToken}`,
            }
       }) ;
       if (response.ok) {
            console.log(response.status) ;
       }
       throw new Error(`Failed to access data. Error: ${response.status}. Check api URL.`)
       
    } catch (error) {
        console.error(error.message);
        throw(error);
    }
}
