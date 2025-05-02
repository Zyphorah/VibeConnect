export class FollowersApi extends Requete
{
    constructor(apiKey, apiUrl) 
    {
        super(apiKey, apiUrl); 
    }

    async recupererSuivisParUtilisateur(followerId) {
        return await this.faireRequete(`/Followers/FollowedBy/${followerId}`, 'GET');
    }

    async recupererFollowersParUtilisateur(followerId) {
        return await this.faireRequete(`/Followers/Follows/${followerId}`, 'GET');
    }

    async ajouterSuivi(followerId, followedId) {
        return await this.faireRequete('/Followers', 'POST', null, {
            FollowerId: followerId,
            FollowedId: followedId
        });
    }

    async supprimerSuivi(followerId, followedId) {
        return await this.faireRequete(`/Followers/${followerId}?followedId=${encodeURIComponent(followedId)}`, 'DELETE');
    }
}