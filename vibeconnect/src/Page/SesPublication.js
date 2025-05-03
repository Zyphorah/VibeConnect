import { CartePublication } from '../Composant/CartePublication.js';
import { useEffect, useState, useContext } from 'react';
import { postsApi } from '../Api/PostsApi.js'; 
import { ApiConfigContext } from '../Context/ApiContext.js';
import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage.js';
import CarteCreationPublication from '../Composant/CarteCreationPublication.js';
import { Button } from 'react-bootstrap';

export function SesPublication() {
  const { url, key } = useContext(ApiConfigContext);
  const postApi = new postsApi(key, url);
  const gestionLocalStorage = new GestionLocalStorage();
  const userId = gestionLocalStorage.recuperer('id');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (posts !== null) return;

    const fetchData = async () => {
      try {
        const result = await postApi.recupererTousLesPosts();
        const allPosts = result.posts || [];
        // Filtrer uniquement les publications de l'utilisateur dont l'ID (propriété owner.id) correspond
        const userPosts = allPosts.filter(post => post.owner && post.owner.id === userId);
        return userPosts;
      } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
        return [];
      }
    };

    if (userId) {
      fetchData().then((data) => {
        setPosts(data);
        console.log("Posts dans fetch:", data);
      });
    }
  }, [postApi, userId, posts]);

  // Nouvelle fonction pour supprimer tous les posts de l'utilisateur
  const handleDeleteAllPosts = async () => {
    if (!posts || posts.length === 0) return;
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer tous vos posts ?")) return;
    try {
      await Promise.all(posts.map(post => postApi.supprimerPost(post.id)));
      setPosts([]);
      console.log("Tous les posts ont été supprimés.");
      alert("Tous vos posts ont été supprimés avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression des posts:", error);
    }
  };

  return (
    <div>
      <CarteCreationPublication />
      {/* Bouton pour supprimer tous les posts */}
      <Button variant="danger" onClick={handleDeleteAllPosts}>
        Supprimer tous mes posts
      </Button>
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

export default SesPublication;