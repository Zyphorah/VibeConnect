import { useEffect, useState, useContext } from 'react';
import { postsApi } from '../../Api/PostsApi.js';
import { ApiConfigContext } from '../../Context/ApiContext.js';

export function useAccueilLogic() {
    const { url, key } = useContext(ApiConfigContext);
    const apiPublication = new postsApi(key, url);
    const [publications, setPublications] = useState(null);

    useEffect(() => {
        if (publications !== null) return;

        const recupererPublications = async () => {
            try {
                const resultat = await apiPublication.recupererTousLesPosts();
                return resultat.posts || [];
            } catch (erreur) {
                console.error("Erreur lors de la récupération des publications:", erreur);
                return [];
            }
        };

        recupererPublications().then((donnees) => {
            setPublications(donnees);
            console.log("Publications récupérées:", donnees);
        });
    }, [apiPublication, publications]);

    return { publications };
}
