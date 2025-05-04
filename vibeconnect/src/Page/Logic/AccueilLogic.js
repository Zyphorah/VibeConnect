import { useEffect, useState, useContext } from 'react';
import { PostsApi } from '../../Api/PostsApi.js'; 
import { ApiConfigContext } from '../../Context/ApiContext.js';

export function useAccueilLogic(refresh, setRefresh) {
    const { url, key } = useContext(ApiConfigContext);
    const apiPublication = new PostsApi(key, url); 
    const [publications, setPublications] = useState(null);
    const [isPublicationsLoaded, setIsPublicationsLoaded] = useState(false); // État pour suivre si les publications sont déjà chargées

    useEffect(() => {
        const recupererPublications = async () => {
            if (isPublicationsLoaded && !refresh) return; // Éviter les requêtes inutiles
            try {
                const resultat = await apiPublication.recupererTousLesPosts();
                setPublications(resultat.posts || []);
                setIsPublicationsLoaded(true);
                console.log("Publications récupérées:", resultat.posts);
            } catch (erreur) {
                console.error("Erreur lors de la récupération des publications:", erreur);
            }
        };

        recupererPublications();
    }, [apiPublication, refresh, isPublicationsLoaded]); // Ajout de isPublicationsLoaded comme dépendance

    return { publications, setRefresh };
}
