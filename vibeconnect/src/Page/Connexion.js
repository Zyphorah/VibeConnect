import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Connexion.css";

export function Connexion() 
{
  return (
    <div className="vibe-login-page">
      <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
        <Card className="login-card">
          <Card.Body>
            <Form ClassName="FormulaireConnexion">
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Control type="text" placeholder="Votre nom d’utilisateur" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control type="password" placeholder="Votre mot de passe" />
              </Form.Group>

              <Button variant="danger" className="w-100 mb-3">
                Se connecter
              </Button>

              <hr />

              <Button variant="secondary" className="w-100">
                Créer un nouveau compte
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="vibe-side-text">
          <h1 className="vibe-title">Vibe Connect</h1>
          <p className="vibe-subtext">
            Rejoignez VibeConnect : partagez des vibes positives et créez des connexions authentiques !
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Connexion;
