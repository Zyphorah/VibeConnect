import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Formulaire/Inscription.css";
import "./Css/Formulaire/formulaire.css";
import "./Css/index.css";
import { DescriptionSection } from "../Composant/DescriptionSection.js";
import { UsersAPI } from "../Api/UsersAPI.js";

 var apiKey = 'API_RA7834F9B2E65C1D0';
 var apiUrl = 'https://api-427-gne0gxh8bwg4bbgp.canadacentral-01.azurewebsites.net/'
 var userApi = new UsersAPI(apiKey, apiUrl);

export function Inscription() {
  const [nom, setNom] = useState(" ");
  const [prenom, setPrenom] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [gmail, setMail] = useState(" ");
  const [password, setPassword] = useState(" ");
  
  return (
    <div className="vibe-login-page">
      <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
        <div className="login-card">
          {/* Partie formulaire */}
          <div className="form-section">
            <h2 className="connexion-title">Créer un compte</h2>
            <Form className="FormulaireConnexion">
              <Form.Group className="mb-3 conteneurNom">
                <Form.Control type="text" placeholder="Nom" className="input-field"  onChange={(e) => setNom(e.target.value)} />
                <Form.Control type="text" placeholder="Prénom" className="input-field" onChange={(e) => setPrenom(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control type="text" placeholder="Votre nom d’utilisateur" className="input-field"onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control type="email" placeholder="Adresse mail" className="input-field" onChange={(e) => setMail(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control type="password" placeholder="Votre mot de passe" className="input-field" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Button variant="danger" className="login-button mt-3" onClick={() => userApi.creerCompte(gmail, password, username, nom, prenom, null, null, null)}>
                S'inscrire
              </Button>

              <div className="text-center mt-3">
                <Link to="/connexion" className="create-account-link">
                  Vous avez déjà un compte ?
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
