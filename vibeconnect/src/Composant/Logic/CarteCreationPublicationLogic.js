export class CarteCreationPublicationLogic {
  constructor(setImageSelectionnee, setPosts, setContenu) {
    this.setImageSelectionnee = setImageSelectionnee;
    this.setPosts = setPosts;
    this.setContenu = setContenu;
  }

  changerImage(e) {
    const fichier = e.target.files[0];
    if (fichier) this.setImageSelectionnee(fichier);
  }

  async gererSubmit(e, contenu, imageSelectionnee, imageApi, api, posts) {
    e.preventDefault();
    try {
      const imageUrl = imageSelectionnee ? await imageApi.enregistrerImage(imageSelectionnee) : '';
      const nouveauPost = await api.creerPost(contenu, imageUrl);
      this.setPosts([nouveauPost, ...posts]);
      this.setContenu('');
      this.setImageSelectionnee(null);
    } catch (err) {
      console.error("Erreur lors de la création du post", err);
    }
  }
}

export async function sauvegarderEdition({ id, editedContent, editedImageUrl, setEditedImageUrl, setIsEditing, imageUploader, postLogic }) {
  try {
    let finalImageUrl = editedImageUrl;
    // Recherche de l'élément file dans le formulaire
    const fileInput = document.querySelector("#formFile input[type='file']");
    if (fileInput && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      finalImageUrl = await imageUploader.enregistrerImage(file);
    }

    await postLogic.gererModifierPublication(id, editedContent, finalImageUrl, () => {
      setEditedImageUrl(finalImageUrl); 
      setIsEditing(false);
    });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des modifications :", error);
  }
}
