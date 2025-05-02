export class commentsApi extends Requete    
{
    constructor(apiKey, apiUrl) 
    {
        super(apiKey, apiUrl); 
    }
    
    async recupererCommentaireParId(id) {
        return await this.faireRequete(`/Comments/${id}`, 'GET');
    }

    async ajouterCommentaire(postId, contenu) {
        return await this.faireRequete('/Comments', 'POST', {
            postId: postId,
            content: contenu
        });
    }

    async supprimerCommentaire(id) {
        return await this.faireRequete(`/Comments/${id}`, 'DELETE');
    }

    async mettreAJourCommentaire(id, contenu) {
        return await this.faireRequete(`/Comments/${id}?commentTxt=${encodeURIComponent(contenu)}`, 'PUT');
    }
}