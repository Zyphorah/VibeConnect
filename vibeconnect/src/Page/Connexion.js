import React, { useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DescriptionSection } from "../Composant/DescriptionSection.js";
import { UsersAPI } from "../Api/UsersAPI.js";
import { GestionLocalStorage } from "../LocalStorage/GestionLocalStorage.js";
import { ApiConfigContext } from '../Context/ApiContext.js';
import { GestionButtonConnexion } from "./Logic/GestionConnexion.js"; 
import { useTranslation } from 'react-i18next'; 
import "../Langue/i18n"; 
import "./Css/Formulaire/Connexion.css";
import { useConnexion } from "../Acces/GestionnaireAcces.js";

import fr from '../Langue/Locales/fr.json';
import en from '../Langue/Locales/en.json';
import es from '../Langue/Locales/es.json';

import i18n from '../Langue/i18n';

i18n.addResourceBundle('fr', 'translation', fr, true, true);
i18n.addResourceBundle('en', 'translation', en, true, true);
i18n.addResourceBundle('es', 'translation', es, true, true);

export function Connexion() {
  useConnexion();
  const { t } = useTranslation(); 
  const { url, Key } = useContext(ApiConfigContext);
  const userApi = new UsersAPI(Key, url);
  const gestionLocalStorage = new GestionLocalStorage();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="vibe-login-page">
      <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
        <div className="login-card">
          <div className="form-section">
            <h2 className="connexion-title">{t('connexion.title')}</h2>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder={t('connexion.usernamePlaceholder')}
                  className="input-field"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Control
                  type="password"
                  placeholder={t('connexion.passwordPlaceholder')}
                  className="input-field"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="danger"
                className="login-button mt-4"
                onClick={() => GestionButtonConnexion(userName, password, userApi, gestionLocalStorage, navigate)}
              >
                {t('connexion.loginButton')}
              </Button>
              <div className="text-center mt-3">
                <Link to="/inscription" className="create-account-link">
                  {t('connexion.createAccount')}
                </Link>
              </div>
            </Form>
          </div>
          <div className="description-section">
            <DescriptionSection />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Connexion;