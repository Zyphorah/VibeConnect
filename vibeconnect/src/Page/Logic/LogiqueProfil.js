import Swal from 'sweetalert2';

export async function handleSaveChanges(usersApi, formData, donneesUtilisateur, setShowModal) {
  if (!formData.userName || !formData.email || !formData.firstName || !formData.lastName) {
    Swal.fire('Erreur', 'Tous les champs doivent être remplis.', 'error');
    return;
  }

  try {
    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    const userDetails = await usersApi.recupererDetailsUtilisateur(donneesUtilisateur.id);
    if (userDetails.email !== formData.email) {
      const allUsers = await usersApi.recupereUtilisateur();
      const emailExists = allUsers.some(user => user.email === formData.email && user.id !== donneesUtilisateur.id);
      if (emailExists) {
        Swal.fire('Erreur', 'Cet email est déjà utilisé.', 'error');
        return;
      }
    }

    // Mise à jour des données utilisateur incluant profilePicture et bannerPicture
    const response = await usersApi.mettreAJourUtilisateur(
      formData.userName,
      formData.email,
      formData.firstName,
      formData.lastName,
      formData.profilePicture || donneesUtilisateur.profilePicture,
      formData.bio,
      formData.password || null, // Inclure le mot de passe uniquement s'il est modifié
      "https://i.ibb.co/mFyNXC6L/images.jpg"
    );

    if (response && response.success) {
      // Mettre à jour les données localement après succès
      donneesUtilisateur.userName = formData.userName;
      donneesUtilisateur.email = formData.email;
      donneesUtilisateur.bio = formData.bio;
      donneesUtilisateur.firstName = formData.firstName;
      donneesUtilisateur.lastName = formData.lastName;
      if (formData.profilePicture) {
        donneesUtilisateur.profilePicture = formData.profilePicture;
      }
      if (formData.bannerPicture) {
        donneesUtilisateur.bannerPicture = formData.bannerPicture;
      }
      Swal.fire('Succès', 'Profil mis à jour avec succès.', 'success');
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour.', 'error');
  } finally {
    setShowModal(false);
  }
}

export async function handleDeleteAccount(usersApi, gestionLocalStorage) {
  const confirmation = await Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action est irréversible. Votre compte sera supprimé.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  });

  if (confirmation.isConfirmed) {
    try {
      const result = await usersApi.supprimerUtilisateur();
      if (result) {
        Swal.fire('Succès', 'Votre compte a été supprimé.', 'success');
        gestionLocalStorage.supprimer('id'); // Supprimer l'ID utilisateur du stockage local
        window.location.href = '/'; // Rediriger vers la page d'accueil
      } else {
        Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
    }
  }
}
