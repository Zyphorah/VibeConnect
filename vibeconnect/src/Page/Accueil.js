import { CartePublication } from '../Composant/CartePublication.js';
import { UsersAPI } from '../Api/UsersAPI.js';
import { useEffect, useState } from 'react';
import { postsApi } from '../Api/PostsApi.js'; // Correction ici

var apiKey = 'API_RA7834F9B2E65C1D0';
var apiUrl = 'https://api-427-gne0gxh8bwg4bbgp.canadacentral-01.azurewebsites.net/';
var postApi = new postsApi(apiKey, apiUrl); // Correction ici

export function Accueil() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        if (posts !== null) return;

        const fetchData = async () => {
            try {
                const result = await postApi.recupererTousLesPosts();
                // Si l'API retourne { posts: [...] }
                return result.posts || [];
            } catch (error) {
                console.error("Erreur lors de la récupération des posts:", error);
                return [];
            }
        };
        fetchData().then((data) => {
            setPosts(data);
            console.log("Posts dans fetch:", data);
        });
    }, []);

    return (
        <div>
            {posts && posts.length > 0 ? (
                posts.map((post, index) => (
                    <CartePublication key={index} post={post} />
                ))
            ) : (
                <p>Aucun post disponible.</p>
            )}
        </div>
    );
}

export default Accueil;