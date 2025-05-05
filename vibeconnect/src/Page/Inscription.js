import React, { useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Formulaire/Inscription.css";
import "./Css/Formulaire/formulaire.css";
import "./Css/index.css";
import { DescriptionSection } from "../Composant/DescriptionSection.js";
import { UsersAPI } from "../Api/UsersAPI.js";
import { ApiConfigContext } from "../Context/ApiContext.js";
import { useInscriptionLogic } from "./Logic/InscriptionLogic.js";
import { useTranslation } from "react-i18next"; 

export function Inscription() {
  const { t } = useTranslation();
  const { url, Key } = useContext(ApiConfigContext);
  const userApi = new UsersAPI(Key, url);
  const {
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
  } = useInscriptionLogic(userApi);

  return (
    <div className="vibe-login-page">
      <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
        <div className="login-card">
          {/* Partie formulaire */}
          <div className="form-section">
            <h2 className="connexion-title">{t('inscription.title')}</h2>
            <Form className="FormulaireConnexion">
              <Form.Group className="mb-3 conteneurNom">
                <Form.Control type="text" placeholder={t('inscription.nomPlaceholder')} className="input-field" onChange={(e) => setNom(e.target.value)} />
                <Form.Control type="text" placeholder={t('inscription.prenomPlaceholder')} className="input-field" onChange={(e) => setPrenom(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control type="text" placeholder={t('inscription.usernamePlaceholder')} className="input-field" onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control type="email" placeholder={t('inscription.emailPlaceholder')} className="input-field" onChange={(e) => setMail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control type="password" placeholder={t('inscription.passwordPlaceholder')} className="input-field" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Button variant="danger" className="login-button mt-3" onClick={handleSubmit}>
                {t('inscription.signupButton')}
              </Button>

              {messageErreur && (
                <div className="mt-3 text-danger">
                  {messageErreur}
                </div>
              )}

              <div className="text-center mt-3">
                <Link to="/connexion" className="create-account-link">
                  {t('inscription.alreadyHaveAccount')}
                </Link>
              </div>
            </Form>
          </div>

          {/* Partie description */}
          <div className="description-section">
            <DescriptionSection />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Inscription;
