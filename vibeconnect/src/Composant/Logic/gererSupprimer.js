import Swal from 'sweetalert2';

export async function gererSupprimer(api, data, onCommentDeleted) {
  if (!data.commentId) {
    return Swal.fire('Erreur!', 'ID du commentaire introuvable.', 'error');
  }

  const { isConfirmed } = await Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Cette action supprimera définitivement le commentaire.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  });

  if (isConfirmed) {
    try {
      await api.supprimerCommentaire(data.commentId);
      Swal.fire('Supprimé!', 'Le commentaire a été supprimé.', 'success');
      onCommentDeleted?.(data.id);
    } catch {
      Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
    }
  }
}
