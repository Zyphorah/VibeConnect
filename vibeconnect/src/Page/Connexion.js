import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { DescriptionSection } from "../Composant/DescriptionSection.js";
import "./Css/Formulaire/Connexion.css";
import "./Css/index.css";
import "./Css/Formulaire/formulaire.css";

export function Connexion() {
  return (
    <div className="vibe-login-page">
      <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
        <div className="login-card">
          <div className="form-section">
            <h2 className="connexion-title">connexion</h2>
            <Form className="FormulaireConnexion">
              <Form.Group controlId="formUsername">
                <Form.Control type="text" placeholder="Votre nom d’utilisateur" className="input-field" />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Control type="password" placeholder="Votre mot de passe" className="input-field" />
              </Form.Group>

              <Button variant="danger" className="login-button mt-4">
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
