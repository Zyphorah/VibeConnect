export class Requete
{
  apiKey = null;
  apiUrl = null;
  #gestionLocalStorage = new GestionLocalStorage();
  
  constructor(apiKey, apiUrl) 
  {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async faireRequete(endpoint, method = 'GET', body = null, requiresAuth = false) {
    const headers = {
        'Content-Type': 'application/json',
        'X-Dev-Api-Key': this.apiKey,
    };

    if (requiresAuth) {
        headers.Authorization = 'Bearer ' + this.#gestionLocalStorage.recuperer('token');
    }

    try {
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error (${method} ${endpoint}):`, errorData);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(`Fetch error (${method} ${endpoint}):`, error);
        return null;
    }
}

}

