export class GestionPost {
  static async filtrerPostsParUtilisateur(postApi, userId) {
    try {
      const result = await postApi.recupererTousLesPosts();
      const allPosts = result.posts || [];
      // Filtrer les posts où l'ID du propriétaire correspond à l'ID de l'utilisateur
      const userPosts = allPosts.filter(post => post.owner && post.owner.id === userId);
      return userPosts;
    } catch (error) {
      console.error("Erreur lors de la récupération des posts:", error);
      return [];
    }
  }

  static async supprimerTousLesPosts(posts, postApi, setPosts) {
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
  }
}
