/**
 * This function returns the response in json format from the api call with the DELETE method
 * @param {String} endpoint The URI of the ressource to delete.
 * @returns {Array} The data in json format from the API call
 */
export async function postData(endpoint, formdata) {

    let userToken = localStorage.token;
    try {
       const response = await fetch(`http://localhost:5678/api${endpoint}`, {
            method: "POST",    
            headers: {
                "Authorization": `Bearer ${userToken}`,
            },
            body: formdata,
       }) ;
       if (response.ok) {            
            return response.status;           
       }
       throw new Error(`Failed to delete data. Error: ${response.status}.`)
       
    } catch (error) {
        console.error(error.message);
        throw(error);
    }
}
