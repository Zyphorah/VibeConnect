import React, { useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DescriptionSection } from "../Composant/DescriptionSection.js";
import { UsersAPI } from "../Api/UsersAPI.js";
import { GestionLocalStorage } from "../LocalStorage/GestionLocalStorage.js";
import { ApiConfigContext } from '../Context/ApiContext.js';
import { GestionButtonConnexion } from "../Logic/GestionConnexion.js"; 
import "./Css/Formulaire/Connexion.css";

export function Connexion() {
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
            <h2 className="connexion-title">connexion</h2>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder="Votre nom d’utilisateur"
                  className="input-field"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Control
                  type="password"
                  placeholder="Votre mot de passe"
                  className="input-field"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="danger"
                className="login-button mt-4"
                onClick={() => GestionButtonConnexion(userName, password, userApi, gestionLocalStorage, navigate)}
              >
                Se connecter
              </Button>
              <div className="text-center mt-3">
                <Link to="/inscription" className="create-account-link">
                  Créer un compte
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
