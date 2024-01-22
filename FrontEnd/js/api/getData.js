/**
 * This function returns the data in json format from the api with the GET method
 * @param {String} endpoint The URI of the ressource 
 * @returns {Array} The data in json format from the API call
 */
export async function getData(endpoint) {
    try {
       const response = await fetch(`http://localhost:5678/api${endpoint}`, {
            headers: {
                "Accept": "application/json"
            }
       }) ;
       if (response.ok) {
        return await response.json() ;
       }
       throw new Error(`Failed to access data. Error: ${response.status}. Check api URL.`)
    } catch (error) {
        console.error(error.message); 
    }
}
