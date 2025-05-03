export async function GestionButtonConnexion(userName, password, userApi, gestionLocalStorage, navigate) {
  if (!userName.trim() || !password.trim()) {
    alert("Veuillez remplir tous les champs.");
    return;
  }
  try {
    const response = await userApi.authentifierUtilisateur(userName, password);
    if (response) {
      gestionLocalStorage.sauvegarder("token", response.token);
      gestionLocalStorage.sauvegarder("id", response.user.id);
      navigate("/Accueil");
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    if (error.status === 401) {
      alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
  }
}
