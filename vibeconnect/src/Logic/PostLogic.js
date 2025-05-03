export class PostLogic {
  constructor(likesApiInstance, commentsApiInstance, postApi) {
    this.likesApiInstance = likesApiInstance;
    this.commentsApiInstance = commentsApiInstance;
    this.postApi = postApi;
  }

  async gererToggleLike(likes, currentUserId, id) {
    const utilisateurAimeDeja = likes.some(like => like.userId === currentUserId);
    try {
      utilisateurAimeDeja
        ? await this.likesApiInstance.supprimerLike(likes.find(like => like.userId === currentUserId)?.likeId)
        : await this.likesApiInstance.ajouterLike(id, currentUserId);
    } catch (error) {
      console.error("Erreur lors de la gestion du like :", error);
    }
  }

  async gererAjouterCommentaire(event, commentText, setCommentText, id) {
    if (event.key === "Enter" && commentText.trim()) {
      try {
        await this.commentsApiInstance.ajouterCommentaire(id, commentText);
        setCommentText("");
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire :", error);
      }
    }
  }

  async gererSupprimer(id, onDelete) {
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
        } catch (error) {
          Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
        }
      }
    });
  }
}
