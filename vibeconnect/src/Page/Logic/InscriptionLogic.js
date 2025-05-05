import { useState } from "react";
import { useTranslation } from "react-i18next";
import {useNavigate} from "react-router-dom";

export function useInscriptionLogic(userApi) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [username, setUsername] = useState("");
  const [gmail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [messageErreur, setMessageErreur] = useState("");

  const handleSubmit = async () => {
    if (!nom.trim() || !prenom.trim() || !username.trim() || !gmail.trim() || !password.trim()) {
      setMessageErreur(t('inscription.errorAllFieldsRequired'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gmail)) {
      setMessageErreur(t('inscription.errorInvalidEmail'));
      return;
    }

    setMessageErreur(""); // Réinitialiser le message d'erreur

    try {
      await userApi.creerCompte(gmail, password, username, nom, prenom, null, null, null);
      navigate("/connexion"); 
    } catch (error) {
      if (error.message === "Le nom d'usager est déjà utilisé") {
        setMessageErreur(t('inscription.errorUsernameTaken'));
      } else if (error.message === "Courriel déjà utilisé par un autre usager") {
        setMessageErreur(t('inscription.errorEmailTaken'));
      } else if (error.message.includes("Download error or resource isn't a valid image")) {
        setMessageErreur(t('inscription.errorInvalidImage'));
      } else {
        setMessageErreur(t('inscription.errorUnknown'));
      }
    }
  };

  return {
    nom,
    setNom,
    prenom,
    setPrenom,
    username,
    setUsername,
    gmail,
    setMail,
    password,
    setPassword,
    messageErreur,
    handleSubmit,
  };
}
