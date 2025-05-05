export class PostLogic {
  constructor(likesApiInstance, commentsApiInstance, postApi) {
    this.likesApiInstance = likesApiInstance;
    this.commentsApiInstance = commentsApiInstance;
    this.postApi = postApi;
  }

  async gererToggleLike(likes, currentUserId, postId, refresh) { 
    const utilisateurAimeDeja = likes.some(like => like.userId === currentUserId);
    try {
      utilisateurAimeDeja
        ? await this.likesApiInstance.supprimerLike(postId) 
        : await this.likesApiInstance.ajouterLike(postId, currentUserId); 
        refresh(); 
    } catch (error) {
      console.error("Erreur lors de la gestion du like :", error);
    }
  }

  async gererAjouterCommentaire(event, commentText, setCommentText, id, refresh) {
    if (event.key === "Enter" && commentText.trim()) {
      try {
        await this.commentsApiInstance.ajouterCommentaire(id, commentText);
        setCommentText("");
        refresh();
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire :", error);
      }
    }
  }

  async gererSupprimer(id, onDelete, refresh) {
    const Swal = (await import('sweetalert2')).default;
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action supprimera définitivement la publication.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          onDelete ? onDelete(id) : await this.postApi.supprimerPost(id);
          Swal.fire('Supprimé!', 'La publication a été supprimée.', 'success');
          refresh();
        } catch (error) {
          Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
        }
      }
    });
  }

  async gererModifierPublication(postId, content, imageUrl, onSuccess, refresh) {
    try {
      await this.postApi.mettreAJourPublication(postId, content, imageUrl); 
      if (onSuccess) onSuccess();
      refresh();
    } catch (error) {
      console.error("Erreur lors de la modification de la publication:", error);
    }
  }
}
