import { Requete } from './Requete';

export class UsersAPI extends Requete 
{
    constructor(apiKey, apiUrl) {
        super(apiKey, apiUrl); 
    }

    async creerCompte(adresseMail, motDePasse, nomUtilisateur, firstName, lastName, profilePicture, bannerPicture, bio) {
        try {
            const response = await fetch(`${this.apiUrl}/Users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Dev-Api-Key': this.apiKey ,
                },
                body: JSON.stringify({
                    username: nomUtilisateur,
                    email: adresseMail,
                    password: motDePasse,
                    firstName: firstName,
                    lastName: lastName,
                    profilePicture: profilePicture,
                    bannerPicture: bannerPicture,
                    bio: bio,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
            } else {
                const data = await response.json();
                console.log('Success:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    
    async authentifierUtilisateur(userName, password) {
        try {
            const response = await fetch(`${this.apiUrl}/Users/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Dev-Api-Key': this.apiKey,
                },
                body: JSON.stringify({
                    userName: userName,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Authentication error:', errorData);
                return null;
            } else {
                const data = await response.json();
                console.log('Authentication success:', data);
                return data; 
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
}