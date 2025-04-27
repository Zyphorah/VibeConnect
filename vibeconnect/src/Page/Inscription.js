import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Formulaire/Inscription.css";
import "./Css/Formulaire/formulaire.css";
import "./Css/index.css";
import { DescriptionSection } from "../Composant/DescriptionSection.js";

export function Inscription() {
  return (
    <div className="vibe-login-page">
      <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
        <div className="login-card">
          {/* Partie formulaire */}
          <div className="form-section">
            <h2 className="connexion-title">Créer un compte</h2>
            <Form className="FormulaireConnexion">
              <Form.Group className="mb-3 conteneurNom">
                <Form.Control type="text" placeholder="Nom" className="input-field" />
                <Form.Control type="text" placeholder="Prénom" className="input-field" />
              </Form.Group>

              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control type="text" placeholder="Votre nom d’utilisateur" className="input-field" />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control type="email" placeholder="Adresse mail" className="input-field" />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control type="password" placeholder="Votre mot de passe" className="input-field" />
              </Form.Group>

              <Button variant="danger" className="login-button mt-3">
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
