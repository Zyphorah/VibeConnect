import Swal from 'sweetalert2';

export class LogiqueProfil {
  constructor(usersApi, postApi, gestionLocalStorage, imageUploader, t) {
    this.usersApi = usersApi;
    this.postApi = postApi;
    this.gestionLocalStorage = gestionLocalStorage;
    this.imageUploader = imageUploader;
    this.t = t;
  }

  async recupererPublicationsUtilisateur(idUtilisateur, setPosts, refresh) {
    try {
      const result = await this.postApi.recupererTousLesPosts(true);
      const userPosts = result.posts.filter((post) => post.owner?.id === idUtilisateur);
      setPosts(userPosts);
    } catch (error) {
      console.error(this.t('pageProfil.errorFetchingPosts'), error);
    }
  }

  rafraichir(setRefresh) {
    setRefresh((prev) => !prev);
  }

  async gererChangementFichier(e, setFormData, setUserData) {
    const { name, files } = e.target;
    if (files && files[0]) {
      try {
        const imageUrl = await this.imageUploader.enregistrerImage(files[0]);
        setFormData((prev) => ({ ...prev, [name]: imageUrl }));
        setUserData((prev) => ({ ...prev, [name]: imageUrl }));
      } catch (error) {
        Swal.fire(this.t('pageProfil.error'), this.t('pageProfil.imageUploadError', { name }), 'error');
      }
    }
  }

  async gererEnregistrementModifications(formData, donneesUtilisateur, setShowModal, setUserData) {
    if (!formData.userName || !formData.email || !formData.firstName || !formData.lastName) {
      Swal.fire(this.t('pageProfil.error'), this.t('pageProfil.errorAllFieldsRequired'), 'error');
      return;
    }

    try {
      const response = await this.usersApi.mettreAJourUtilisateur(
        formData.userName,
        formData.email,
        formData.firstName,
        formData.lastName,
        formData.profilePicture || donneesUtilisateur.profilePicture,
        formData.bio,
        formData.password || null,
        formData.bannerPicture || donneesUtilisateur.bannerPicture
      );

      if (response && response.success) {
        setUserData((prev) => ({ ...prev, ...formData }));
        Swal.fire(this.t('pageProfil.success'), this.t('pageProfil.profileUpdated'), 'success');
      }
    } catch (error) {
      console.error(this.t('pageProfil.errorUpdatingProfile'), error);
      Swal.fire(this.t('pageProfil.error'), this.t('pageProfil.errorUnknown'), 'error');
    } finally {
      setShowModal(false);
    }
  }

  async gererSuppressionCompte() {
    const confirmation = await Swal.fire({
      title: this.t('pageProfil.confirmDeleteTitle'),
      text: this.t('pageProfil.confirmDeleteText'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.t('pageProfil.confirmDeleteConfirm'),
      cancelButtonText: this.t('pageProfil.confirmDeleteCancel'),
    });

    if (confirmation.isConfirmed) {
      try {
        const result = await this.usersApi.supprimerUtilisateur();
        if (result) {
          Swal.fire(this.t('pageProfil.success'), this.t('pageProfil.accountDeleted'), 'success');
          this.gestionLocalStorage.supprimer('id');
          window.location.href = '/';
        } else {
          Swal.fire(this.t('pageProfil.error'), this.t('pageProfil.errorDeletingAccount'), 'error');
        }
      } catch (error) {
        console.error(this.t('pageProfil.errorDeletingAccount'), error);
        Swal.fire(this.t('pageProfil.error'), this.t('pageProfil.errorUnknown'), 'error');
      }
    }
  }

  afficherAucuneDonneeUtilisateur() {
    return <p>{this.t('pageProfil.noUserData')}</p>;
  }
}
