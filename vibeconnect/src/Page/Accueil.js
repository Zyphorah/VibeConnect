import { CartePublication } from '../Composant/CartePublication.js';
import { UsersAPI } from '../Api/UsersAPI.js';
import { useEffect, useState } from 'react';

var apiKey = 'API_RA7834F9B2E65C1D0';
var apiUrl = 'https://api-427-gne0gxh8bwg4bbgp.canadacentral-01.azurewebsites.net/';
var userApi = new UsersAPI(apiKey, apiUrl);

export function Accueil() {
    const [utilisateur, setUtilisateur] = useState(null);
    useEffect(() => {
        if (utilisateur !== null) return;

        const fetchData = async () => {
            try {
                const utilisateur = await userApi.recupereUtilisateur();
                return utilisateur;
                //console.log("Utilisateur dans Accueil:", utilisateur);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur:", error);
            }
        };
        fetchData().then((data) => {
            setUtilisateur(data);
            console.log("Utilisateur dans fetch:", data);
        }, []);
    }
    , []);


    return (
        <div>
            {utilisateur ? (
                utilisateur.map((user, index) => (
                    <CartePublication key={index} utilisateur={user} />
                ))
            ) : (
                <p>Aucun utilisateur disponible.</p>
            )}
        </div>
    );
}

export default Accueil;