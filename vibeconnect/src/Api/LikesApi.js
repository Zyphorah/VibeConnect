import { Requete } from './Requete';

export class likesApi extends Requete
{
    constructor(apiKey, apiUrl) 
    {
        super(apiKey, apiUrl); 
    }

    async recupererLikesParId(id) {
        return await this.faireRequete(`/Likes/${id}`, 'GET');
    }

    async ajouterLike(postId, userId) {
        return await this.faireRequete(`/Likes/${postId}?userId=${encodeURIComponent(userId)}`, 'POST');
    }

    async supprimerLike(postId) {
        return await this.faireRequete(`/Likes/${postId}`, 'DELETE'); 
    }
}