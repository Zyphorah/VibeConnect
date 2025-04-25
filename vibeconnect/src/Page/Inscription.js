import React from "react";
import { Container, Form, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Inscription.css";
import { Link } from "react-router-dom";

export function Inscription() 
{
  return (
    <div className="vibe-inscription-page">
      <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
        <Card className="inscription-card">
          <Card.Body>
            <Form ClassName="FormulaireConnexion">
            <Form.Group className="mb-3 conteneurNom">
                <Form.Control type="text" placeholder="Nom" />
                <Form.Control type="text" placeholder="Prénom" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Control type="text" placeholder="Votre nom d’utilisateur" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control type="password" placeholder="Votre mot de passe" />
              </Form.Group>

              <Button variant="danger" className="w-100 mb-3">
                S'inscrire
              </Button>

              <hr />
              <Form.Group className="d-flex justify-content-center">
                <Link to="/connexion" className="text-center">Vous avez déjà un compte ?</Link>
              </Form.Group>
              
              
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Inscription;
