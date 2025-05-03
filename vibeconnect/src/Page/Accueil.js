import { CartePublication } from '../Composant/CartePublication.js';
import { useEffect, useState } from 'react';
import { postsApi } from '../Api/PostsApi.js'; 
import { ApiConfigContext } from '../Context/ApiContext.js';
import { useContext } from 'react';


export function Accueil() {
    const { url, key } = useContext(ApiConfigContext);
    var postApi = new postsApi(key, url); 
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