import { Requete } from './Requete';

export class PostsApi extends Requete
{
    constructor(apiKey, apiUrl) {
        super(apiKey, apiUrl); 
    }

    async recupererPostsDesAbonnements(followerId) {
        return await this.faireRequete(`/Posts/FromFollowers/${followerId}?addComments=true&addLikes=true`, 'GET');
    }

    async recupererPostParId(id) {
        return await this.faireRequete(`/Posts/${id}`, 'GET');
    }

    async creerPost(contenu, urlImage) {
        return await this.faireRequete('/Posts', 'POST', {
            content: contenu,
            imageUrl: urlImage,
        });
    }

    async mettreAJourPost(id, contenu, urlImage) {
        return await this.faireRequete(`/Posts/${id}`, 'PUT', {
            content: contenu,
            imageUrl: urlImage,
        });
    }

    async mettreAJourPublication(id, content, imageUrl) {
        return await this.faireRequete(`/Posts/${id}`, 'PUT', {
            content: content,
            imageUrl: imageUrl,
        });
    }

    async supprimerPost(id) {
        return await this.faireRequete(`/Posts/${id}`, 'DELETE');
    }

    async recupererTousLesPosts() {
        return await this.faireRequete('/Posts/All?maxItems=1000&addUserInfos=true&addLikes=true&addComments=true', 'GET');
    }
}