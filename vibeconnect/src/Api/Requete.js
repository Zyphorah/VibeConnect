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

  async faireRequete(endpoint, method = 'GET', body = null, extraOptions = {}, extraHeaders = {}) {
    // Fusionner les headers par défaut avec les extraHeaders
    const headers = {
      'Content-Type': 'application/json',
      'X-Dev-Api-Key': this.apiKey,
      ...extraHeaders
    };
    
    const token = this.gestionLocalStorage.recuperer('token');
    // Si un token est présent, l'ajouter, sinon ne rien faire
    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }
 
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        ...extraOptions,
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

