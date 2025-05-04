import { Requete } from './Requete';


export class UsersAPI extends Requete 
{
    constructor(apiKey, apiUrl) {
        super(apiKey, apiUrl); 
    }

    async creerCompte(adresseMail, motDePasse, nomUtilisateur, firstName, lastName, profilePicture, bannerPicture, bio) {
        return await this.faireRequete('/Users', 'POST', {
            username: nomUtilisateur,
            email: adresseMail,
            password: motDePasse,
            firstName,
            lastName,
            profilePicture,
            bannerPicture,
            bio,
        });
    }

    async authentifierUtilisateur(userName, password) {
        return await this.faireRequete('/Users/authenticate', 'POST', {
            userName,
            password,
        });
    }

    async recupereUtilisateur() {
        return await this.faireRequete('/Users', 'GET', null, true);
    }

    async mettreAJourUtilisateur(userName, email, firstName, lastName, profilePicture, bio, password, bannerPicture) {
        const userId = this.gestionLocalStorage.recuperer('id'); 
        if (!userId) {
            throw new Error("ID utilisateur introuvable dans le stockage local.");
        }

        return await this.faireRequete(`/Users/${userId}`, 'PUT', {
            userName,
            email,
            firstName,
            lastName,
            profilePicture,
            bio,
            password,
            bannerPicture
        }, true);
    }

    async supprimerUtilisateur() {
        const userId = this.gestionLocalStorage.recuperer('id');
        const result = await this.faireRequete(`/Users/${userId}`, 'DELETE', null, true);
        return result !== null;
    }

    async recupererDetailsUtilisateur(idUtilisateur) {
        return await this.faireRequete(`/Users/${idUtilisateur}`, 'GET', null, true);
    }
}