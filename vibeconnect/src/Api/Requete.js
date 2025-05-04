import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage';

export class Requete {
  apiKey = null;
  apiUrl = null;
  gestionLocalStorage = new GestionLocalStorage();

  constructor(apiKey, apiUrl) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async faireRequete(endpoint, method = 'GET', body = null, extraOptions = {}, extraHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'X-Dev-Api-Key': this.apiKey,
      ...extraHeaders
    };

    const token = this.gestionLocalStorage.recuperer('token');
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
        throw new Error(errorData.message || 'Une erreur est survenue.');
      }

      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (error) {
      console.error(`Fetch error (${method} ${endpoint}):`, error);
      throw error; // Propager l'erreur pour qu'elle soit gérée par l'appelant
    }
  }
}

