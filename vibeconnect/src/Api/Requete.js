import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage';

export class Requete
{
  apiKey = null;
  apiUrl = null;
  gestionLocalStorage = new GestionLocalStorage();

  constructor(apiKey, apiUrl) 
  {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async faireRequete(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'X-Dev-Api-Key': this.apiKey,
    };

   
        const token = this.gestionLocalStorage.recuperer('token');
        if (!token) {
            console.error('Token manquant ou invalide');
            throw new Error('Token manquant ou invalide');
        }
        headers.Authorization = 'Bearer ' + token;
 

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

        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error(`Fetch error (${method} ${endpoint}):`, error);
        return null;
    }
  }
}

