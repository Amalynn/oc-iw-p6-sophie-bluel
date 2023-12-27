/**
 * 
 * 
 */
export async function getData(endpoint) {
    try {
       const response = await fetch(`http://localhost:5678/api/${endpoint}`, {
            headers: {
                "Accept": "appliaction/json"
            }
       }) ;
       if (response.ok) {
        return await response.json() ;
       }
       throw new Error(`Failed to access data. Error: ${response.status}`)
    } catch (error) {
        console.error(error.message);
    }
}