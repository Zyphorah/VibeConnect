import { useEffect, useState, useContext } from 'react';
import { PostsApi } from '../../Api/PostsApi.js'; 
import { ApiConfigContext } from '../../Context/ApiContext.js';
import { GestionLocalStorage } from '../../LocalStorage/GestionLocalStorage.js';
import { GestionPost } from '../../Composant/Logic/GestionPost.js';
import Swal from 'sweetalert2';

export function useSesPublicationLogic(refresh) {
  const { url, key } = useContext(ApiConfigContext);
  const postApi = new PostsApi(key, url); 
  const gestionLocalStorage = new GestionLocalStorage();
  const userId = gestionLocalStorage.recuperer('id');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await postApi.recupererTousLesPosts();
        const userPosts = result.posts.filter(post => post.owner?.id === userId);
        setPosts(userPosts);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
      }
    };

    if (userId) {
      fetchPosts();
    }
  }, [userId, refresh]); // Ajout de refresh comme dépendance

  const supprimerTousLesPosts = () => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action supprimera définitivement tous vos posts.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await GestionPost.supprimerTousLesPosts(posts, postApi, setPosts);
          Swal.fire('Supprimé!', 'Tous vos posts ont été supprimés.', 'success');
        } catch (error) {
          Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
        }
      }
    });
  };

  return { posts, setPosts, supprimerTousLesPosts };
}
